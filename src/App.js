
// import UserForm from './UserForm';
// import MakeHaiku from './MakeHaiku';

import './Sass/App.scss';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // state to store axios return for searched word and other similar words
  const [soundsLike, setSoundsLike] = useState([])
  // state to handle the word the user is searching
  const [userInput, setUserInput] = useState('')
  // contains the filtered data from API call (object with userInput word info)
  const [searchedWord, setSearchedWord] = useState([])
  const [line1, setLine1] = useState(5)
  const [line2, setLine2] = useState(7)
  const [line3, setLine3] = useState(5)
  const [currentLine, setCurrentLine] = useState(1)
  const [haikuLine1, setHaikuLine1] = useState('')
  const [haikuLine2, setHaikuLine2] = useState('')
  const [haikuLine3, setHaikuLine3] = useState('')

  const apiCall = (userInput) => {
    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        max: 10, //Keep an eye on this number of we don't get the word back on the page
        sl: userInput,
        md: 's'
      }
    }).then((res) => {
      setSoundsLike(res.data)
    })
  }


  const handleChange = (event) => {
    const input = event.target.value.toLowerCase()
    setUserInput(input)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    apiCall(userInput)
  }

  useEffect(() => {
    const copyOfApiData = [...soundsLike]
    const filteredApiData = copyOfApiData.filter((wordArray => {
      return (wordArray.word === userInput)
    }))
    setSearchedWord(filteredApiData) //watch for errors and go through it again for more clarity
  
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundsLike])

  const handleAddToHaiku = (event) => {
    event.preventDefault();
    console.log('i have been clicked')
    updateHaiku();
  }

  const updateHaiku = () => {
    const usedSyllables = searchedWord[0]['numSyllables']
    console.log('this is searchedWord', searchedWord[0]['numSyllables'])

    if ((line1 - usedSyllables) > 0 && currentLine === 1){
      setLine1(line1 - usedSyllables)
      setHaikuLine1(haikuLine1 + ' ' + userInput)
    } else if ((line1 - usedSyllables) === 0 && currentLine === 1) {
        setLine1(line1 - usedSyllables)
        setHaikuLine1(haikuLine1 + ' ' + userInput)
        setCurrentLine(2)
    } else if ((line1 - usedSyllables) < 0 && currentLine === 1) {
        alert("you can't add this word")
    } else if ((line2 - usedSyllables) > 0 && currentLine === 2) {
        setLine2(line2 - usedSyllables)
        setHaikuLine2(haikuLine2 + ' ' + userInput)
    } else if ((line2 - usedSyllables) === 0 && currentLine === 2) {
        setLine2(line2 - usedSyllables)
        setHaikuLine2(haikuLine2 + ' ' + userInput)
        setCurrentLine(3)
    } else if ((line2 - usedSyllables) < 0 && currentLine === 2) {
        alert("you can't add this word")
    } else if ((line3 - usedSyllables) > 0 && currentLine === 3) {
        setLine3(line3 - usedSyllables)
        setHaikuLine3(haikuLine3 + ' ' + userInput)
    } else if ((line3 - usedSyllables) === 0 && currentLine === 3) {
        setLine3(line3 - usedSyllables)
        setHaikuLine3(haikuLine3 + ' ' + userInput)
        alert('you are done!')
    } else if ((line3 - usedSyllables) < 0 && currentLine === 3) {
        alert("you can't add this word")
    }
  
    setSearchedWord([]);
    setUserInput('');
  };

  return (
    <div className="App">
      <h1>Haikus Highway</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input type="text" value={userInput} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleAddToHaiku}>add to haiku</button>
      <ul className="searchedWord">
        {
          searchedWord.map((returnedWord) => {
            return (
              <li>
                <p>You have searched for</p>
                <p>{returnedWord.word}</p>
              </li>
            )
          })
        }
      </ul>
      <ul className="haiku">
        <li>
          <p>Here is your Haiku</p>
        </li>
        <li>
          <p>{haikuLine1}</p>
          <p>{line1}</p>
        </li>
        <li>
          <p>{haikuLine2}</p>
          <p>{line2}</p>
        </li>
        <li>
          <p>{haikuLine3}</p>
          <p>{line3}</p>
        </li>
      </ul>

    </div>
  );
}

export default App;
