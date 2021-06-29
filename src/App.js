import UserForm from './UserForm';
// import MakeHaiku from './MakeHaiku';

import './Sass/App.scss';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
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

  // for second APi call
  const [frequentlyFollowed, setFrequentlyFollowed] = useState([])

  // state for filtered frequently followed
  const [filterFrequentFollow, setFilterFrequentFollow] = useState([])
  
  useEffect( () => {
    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        max: 10, //Keep an eye on this number of we don't get the word back on the page
        rel_bga: userInput,
        rel_trg: userInput,
        md: 's'
      }
    }).then((response) => {
      setFrequentlyFollowed(response.data)
      filterFreqFol(response.data)
      console.log('I am new thingy', response.data);
      setUserInput('');
    })
  }, [line1, line2, line3])

  const filterFreqFol = (secondApiData) => {
    const suggestedWords = [...secondApiData]
    console.log(line1, line2, line3);
    let filteredSuggestedWords = []
      if (currentLine === 1) {
        filteredSuggestedWords = suggestedWords.filter((wordArray => {
          return (wordArray.numSyllables <= line1)
        }))
      } else if (currentLine === 2) {
        filteredSuggestedWords = suggestedWords.filter((wordArray => {
          return (wordArray.numSyllables <= line2)
        }))
      } else if (currentLine === 3) {
        filteredSuggestedWords = suggestedWords.filter((wordArray => {
          return (wordArray.numSyllables <= line3)
        }))
      }

    setFilterFrequentFollow(filteredSuggestedWords);
    console.log('this is this', filteredSuggestedWords);
  }

  const updateHaiku = () => {
    const usedSyllables = searchedWord[0]['numSyllables']
    const usedWord = searchedWord[0]['word']
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
    // secondApiCall(usedWord);
    setSearchedWord([]);
    // setUserInput('');   
  }

  const handleAddToHaiku = (event) => {
    event.preventDefault();
    console.log('i have been clicked')
    updateHaiku();
  }

  return (
    <div className="App">
      <h1>Haikus Highway</h1>

      {/* CALLING USERFORM COMPONENT AND PASSING THE PROPS */}
      <UserForm 
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        userInput={userInput}
        setUserInput={setUserInput}
        handleAddToHaiku={handleAddToHaiku}
      />
      
      <div className="suggestedWords">
        <ul>
          {
            filterFrequentFollow.map((wordSuggestion, index) => {
              return (
                <li key={index}>
                  {wordSuggestion.word}
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="haiku">
        <div className="haikuHeading">
          <h2>Here is your Haiku</h2>
        </div>
        <div className="haikuLine">
          <p>{haikuLine1}</p>
          <p>{line1}</p>
        </div>
        <div className="haikuLine">
          <p>{haikuLine2}</p>
          <p>{line2}</p>
        </div>
        <div className="haikuLine">
          <p>{haikuLine3}</p>
          <p>{line3}</p>
        </div>
      </div>
    </div>
  );


}

export default App;
