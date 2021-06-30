import axios from "axios";
import { useEffect, useState } from "react";

function RecommendedWords( { currentLine, line1, line2, line3, userInput, setUserInput } ) {

  //  // for second APi call
  // const [frequentlyFollowed, setFrequentlyFollowed] = useState([])

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
      // setFrequentlyFollowed(response.data)
      filterFreqFol(response.data)
      console.log('I am new thingy', response.data);
      setUserInput('');
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
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
  )
} 

export default RecommendedWords;