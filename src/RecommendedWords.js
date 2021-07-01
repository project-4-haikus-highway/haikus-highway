import axios from "axios";
import { useEffect, useState } from "react";

function RecommendedWords({ currentLine, line1, line2, line3, userInput, setUserInput, setSearchedWord, loadDisplay } ) {

  const [filterFrequentFollow, setFilterFrequentFollow] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)
  
  useEffect( () => {
    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        max: 100,
        rel_trg: userInput,
        md: 's'
      }
    }).then((response) => {
      filterFreqFol(response.data)
      setUserInput('');
      setIsLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line1, line2, line3])

  // filtering the API data to determine where it is going and that only the correct numSyllables are sent on
  const filterFreqFol = (secondApiData) => {
    const suggestedWords = [...secondApiData]
    let filteredSuggestedWords = []
    let tenFilteredSuggestedWords = []

    if (currentLine === 1) {
      filteredSuggestedWords = suggestedWords.filter((wordArray => {
        return (wordArray.numSyllables <= line1)
      }))
      filterSuggest(filteredSuggestedWords, tenFilteredSuggestedWords)

    } else if (currentLine === 2) {
      filteredSuggestedWords = suggestedWords.filter((wordArray => {
        return (wordArray.numSyllables <= line2)
      }))
      filterSuggest(filteredSuggestedWords, tenFilteredSuggestedWords)

    } else if (currentLine === 3) {
      filteredSuggestedWords = suggestedWords.filter((wordArray => {
        return (wordArray.numSyllables <= line3)
      }))
      filterSuggest(filteredSuggestedWords, tenFilteredSuggestedWords)
    }
  }

  // create array of suggested words from API to max of 10 words
  function filterSuggest(filteredSuggestedWords, tenFilteredSuggestedWords) {
    if (filteredSuggestedWords.length >= 10) {
      setErrorMessage(false)
      for (let i = 0; i < 10; i++) {
        tenFilteredSuggestedWords.push(filteredSuggestedWords[i])
      }
      setFilterFrequentFollow(tenFilteredSuggestedWords)
    } else if (filteredSuggestedWords.length >= 1) {
      setFilterFrequentFollow(filteredSuggestedWords)
    } else if (line3 === 0) {
      setFilterFrequentFollow([])
      setErrorMessage(true)
    } else { setErrorMessage(true) }
  }

  // onClick that allows suggested word to be added 
  function addRecommendedWord (newWord) {
    setUserInput(newWord.word);
    setSearchedWord([newWord]);
  }

  return (
    <div className="suggestedWords">
      {
        isLoading ? <p>Loading...</p> :
        <>
          {
            errorMessage ? 
              <p id="errorMessage" className={"recWordTitle" + (loadDisplay ? " noDisplay" : "")}>
                Couldn't find any recommended words, sorry!
              </p> : 
              <p id="errorMessage"className={"recWordTitle" + (loadDisplay ? " noDisplay" : "")}>
                Here are some recommended words! Click them to continue building your Haiku!
              </p>
          }
          <ul>
            {
              filterFrequentFollow.map((wordSuggestion, index) => {
                return (
                  <li className="returnedWords" key={index}>
                    <button onClick={() => { addRecommendedWord(wordSuggestion) }}>
                      {wordSuggestion.word}
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </>

      }
    </div>
  )
} 

export default RecommendedWords;