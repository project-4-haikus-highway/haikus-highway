import { useState } from 'react';
import axios from "axios";


function UserForm( {searchedWord, setSearchedWord, userInput, setUserInput, handleAddToHaiku} ) {
    // state to store axios return for searched word and other similar words
  // const [soundsLike, setSoundsLike] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  const apiCall = (userInput) => {
    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        max: 100, //Keep an eye on this number of we don't get the word back on the page
        sl: userInput,
        md: 's'
      }
    }).then((res) => {
      // setSoundsLike(res.data);
      console.log(res.data);
      userInputFilter(res.data);
      setIsLoading(false);
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
    setIsLoading(true)
  }

  return(
    <div>

      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input type="text" value={userInput} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {
        isLoading ? <p>Loading...</p> :
        <ul className="searchedWord">
        {
          searchedWord.map((returnedWord, index) => {
            return (
              <li key={index}>
                <p>Click on the word to add to your haiku</p>
                <p onClick={handleAddToHaiku} className="addToHaiku">{returnedWord.word}</p>
              </li>
            )
          })
        }
        </ul>
      }
    </div>
  )

}

export default UserForm;