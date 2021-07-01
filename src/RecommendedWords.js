import axios from "axios";
import { useEffect, useState } from "react";

function RecommendedWords({ currentLine, line1, line2, line3, userInput, setUserInput, setSearchedWord } ) {

  //  // for second APi call
  // const [frequentlyFollowed, setFrequentlyFollowed] = useState([])

  // state for filtered frequently followed
  const [filterFrequentFollow, setFilterFrequentFollow] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)
  

  useEffect( () => {
    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        max: 100, //Keep an eye on this number of we don't get the word back on the page
        rel_trg: userInput,
        md: 's'
      }
    }).then((response) => {
      // setFrequentlyFollowed(response.data)
      filterFreqFol(response.data)
      console.log('I am new thingy', response.data);
      setUserInput('');
      setIsLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line1, line2, line3])

  const filterFreqFol = (secondApiData) => {
    const suggestedWords = [...secondApiData]
    console.log(line1, line2, line3);
    let filteredSuggestedWords = []
    let tenFilteredSuggestedWords = []
      if (currentLine === 1) {
        filteredSuggestedWords = suggestedWords.filter((wordArray => {
          return (wordArray.numSyllables <= line1)
        }))
        if (filteredSuggestedWords.length >= 1){
          setErrorMessage(false)
          for(let i = 0; i < 10; i++){
            tenFilteredSuggestedWords.push(filteredSuggestedWords[i])
          }
        } else {setErrorMessage(true)}
      } else if (currentLine === 2) {
        filteredSuggestedWords = suggestedWords.filter((wordArray => {
          return (wordArray.numSyllables <= line2)
        }))
        if (filteredSuggestedWords.length >= 1){
          setErrorMessage(false)
          for(let i = 0; i < 10; i++){
            tenFilteredSuggestedWords.push(filteredSuggestedWords[i])
          }
        } else {setErrorMessage(true)}
      } else if (currentLine === 3) {
        filteredSuggestedWords = suggestedWords.filter((wordArray => {
          return (wordArray.numSyllables <= line3)
        }))
        if (filteredSuggestedWords.length >= 1){
          setErrorMessage(false)
          for(let i = 0; i < 10; i++){
            tenFilteredSuggestedWords.push(filteredSuggestedWords[i])
          }
        } else {setErrorMessage(true)}
      }
      console.log(tenFilteredSuggestedWords)
      setFilterFrequentFollow(tenFilteredSuggestedWords);
      console.log('filteredSuggestedWords', filteredSuggestedWords);
      }

function addRecommendedWord (newWord) {
  console.log(newWord);
  setUserInput(newWord.word);
  setSearchedWord([newWord]);
}

  return (
    <div className="suggestedWords">
      {
        isLoading ? <p>Loading...</p> :
        <>
          <p className="recWordTitle noShow">
              Here are the recomended words
          </p>
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
      {errorMessage ? <p id="errorMessage" className="otherClass, noDisplay">Couldn't Find Any Words, Sorry!</p> : <div id="errorMessage"></div>}
    </div>
  )
} 

export default RecommendedWords;