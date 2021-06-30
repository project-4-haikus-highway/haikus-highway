import UserForm from './UserForm';
import RecommendedWords from './RecommendedWords';
import Alerts from './Alerts';
// import MakeHaiku from './MakeHaiku';
import './Sass/App.scss';
import { useState } from "react";


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
  const [showAlert, setShowAlert] = useState(false)

  const updateHaiku = () => {
    const usedSyllables = searchedWord[0]['numSyllables']
    // const usedWord = searchedWord[0]['word']
    // console.log('this is searchedWord', searchedWord[0]['numSyllables'])

    if ((line1 - usedSyllables) > 0 && currentLine === 1){
      setLine1(line1 - usedSyllables)
      setHaikuLine1(haikuLine1 + ' ' + userInput)
    } else if ((line1 - usedSyllables) === 0 && currentLine === 1) {
        setLine1(line1 - usedSyllables)
        setHaikuLine1(haikuLine1 + ' ' + userInput)
        setCurrentLine(2)
    } else if ((line1 - usedSyllables) < 0 && currentLine === 1) {
        setShowAlert(true)
    } else if ((line2 - usedSyllables) > 0 && currentLine === 2) {
        setLine2(line2 - usedSyllables)
        setHaikuLine2(haikuLine2 + ' ' + userInput)
    } else if ((line2 - usedSyllables) === 0 && currentLine === 2) {
        setLine2(line2 - usedSyllables)
        setHaikuLine2(haikuLine2 + ' ' + userInput)
        setCurrentLine(3)
    } else if ((line2 - usedSyllables) < 0 && currentLine === 2) {
        setShowAlert(true)
    } else if ((line3 - usedSyllables) > 0 && currentLine === 3) {
        setLine3(line3 - usedSyllables)
        setHaikuLine3(haikuLine3 + ' ' + userInput)
    } else if ((line3 - usedSyllables) === 0 && currentLine === 3) {
        setLine3(line3 - usedSyllables)
        setHaikuLine3(haikuLine3 + ' ' + userInput)
        alert('you are done!')
    } else if ((line3 - usedSyllables) < 0 && currentLine === 3) {
        setShowAlert(true)
    }
    setSearchedWord([]);
  }

  const handleAddToHaiku = (event) => {
    event.preventDefault();
    console.log('i have been clicked')
    updateHaiku();
  }

  return (
    <div className="App">
      <h1>Haikus Highway</h1>

      {/* MOUNTING USERFORM COMPONENT AND PASSING THE PROPS */}
      <UserForm 
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        userInput={userInput}
        setUserInput={setUserInput}
        handleAddToHaiku={handleAddToHaiku}
      />

      {/* MOUNTING RECOMMENDEDWORDS COMPONENT AND PASSING THE PROPS */}
      <RecommendedWords
        currentLine={currentLine}
        line1={line1}
        line2={line2}
        line3={line3}
        userInput={userInput}
        setUserInput={setUserInput}
      />

      {showAlert === true
        ? <Alerts setShowAlert={setShowAlert} setUserInput={setUserInput}/>
        : null}

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
