// import { useState } from 'react';
import axios from "axios";

function UserForm( {searchedWord, setSearchedWord, userInput, setUserInput, handleAddToHaiku} ) {
    // state to store axios return for searched word and other similar words
  // const [soundsLike, setSoundsLike] = useState([]);

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
      // setSoundsLike(res.data);
      userInputFilter(res.data);
    })
  }

  const userInputFilter = (apiData) => {
    const copyOfApiData = [...apiData]
    const filteredApiData = copyOfApiData.filter((wordArray => {
      return (wordArray.word === userInput)
    }))
    setSearchedWord(filteredApiData) //watch for errors and go through it again for more clarity  
  }

  const handleChange = (event) => {
    const input = event.target.value.toLowerCase()
    setUserInput(input)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    apiCall(userInput)
  }

  return(
    <div className="formContainer">
      
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="">Please enter a word to make haiku</label>
        <input type="text" value={userInput} onChange={handleChange} placeholder="Hey.."/>
        <button type="submit">Search</button>
      </form>
      <ul className="searchedWord">
      {
        searchedWord.map((returnedWord, index) => {
          return (
            <li key={index}>
              <p>Click on the word to add to your haiku</p>
              <button onClick={handleAddToHaiku} className="addToHaiku">{returnedWord.word}</button>
            </li>
          )
        })
      }
      </ul>
    </div>
  )

}

export default UserForm;