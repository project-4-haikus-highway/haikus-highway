import UserForm from './js/UserForm';
import RecommendedWords from './js/RecommendedWords';
import Alerts from './js/Alerts';
import './Sass/App.scss';
import { useState } from "react";
import bg from './Assets/bg.mp4'
import ConfirmWord from './js/ConfirmWord';
import Lottie from "lottie-react";
import animation from "./animation.json";
import Footer from "./js/Footer";

function App() {
  // to handle the word the user is searching
  const [userInput, setUserInput] = useState('')

  // contains the filtered data from API call (object with userInput word info)
  const [searchedWord, setSearchedWord] = useState([])  

  // keep count of remaining syllables
  const [line1, setLine1] = useState(5)
  const [line2, setLine2] = useState(7)
  const [line3, setLine3] = useState(5)

  //  to keep track of current line
  const [currentLine, setCurrentLine] = useState(1)

  // to store haiku lines as they build
  const [haikuLine1, setHaikuLine1] = useState('')
  const [haikuLine2, setHaikuLine2] = useState('')
  const [haikuLine3, setHaikuLine3] = useState('')

  // to mount haiku
  const [appearHaiku, setAppearHaiku] = useState(false)

  // to mount alert
  const [showAlert, setShowAlert] = useState(false)

  // to mount done notice
  const [doneMsg, setDoneMsg] = useState(false)

  // loading states
  const [isLoading, setIsLoading] = useState(false)
  const [loadDisplay, setLoadDisplay] = useState(true)

  // build haiku strings after user adds a word
  const updateHaiku = () => {
    setAppearHaiku(true)
    const usedSyllables = searchedWord[0]['numSyllables']
  
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
        setDoneMsg(true)
    } else if ((line3 - usedSyllables) < 0 && currentLine === 3) {
        setShowAlert(true)
    }
    setSearchedWord([]);
  }

  // updates haiku and loading state
  const handleAddToHaiku = (event) => {
    event.preventDefault();
    updateHaiku();
    setLoadDisplay(false)
  }

  return (
    <div className="App">

      <video autoPlay loop muted>
          <source src={bg} type="video/mp4"/>
      </video>
      <div className="wrapper">
        <div className="content">
          <header>
            <h1>Haikus Highway</h1>
          </header>
        
          <main>
            <UserForm 
              setSearchedWord={setSearchedWord}
              userInput={userInput}
              setUserInput={setUserInput}
              setIsLoading={setIsLoading}
            />

            <RecommendedWords
              currentLine={currentLine}
              line1={line1}
              line2={line2}
              line3={line3}
              userInput={userInput}
              setUserInput={setUserInput}
              setSearchedWord={setSearchedWord}
              loadDisplay={loadDisplay}
            />

            <ConfirmWord
              searchedWord={searchedWord}
              handleAddToHaiku={handleAddToHaiku}
              isLoading={isLoading}
            />

          {appearHaiku ?
            <>
            {
              showAlert === true
              ? <Alerts setShowAlert={setShowAlert} setUserInput={setUserInput}/>
              : null
            }
            
            <div className="haiku">
              <div className="haikuHeading">
                <h2>Here is your Haiku</h2>
              </div>
            
              <div className="haikuContainer">
                <div className="haikuAllLines">
                      <p>{haikuLine1}</p>
                      <p>{haikuLine2}</p>
                      <p>{haikuLine3}</p>
                </div>
                <div className="haikuSyllables">
                <p className="syllablesTitle"># Syllable(s) left</p>
                  <p>1st Line: {line1}</p>
                  <p>2nd Line: {line2}</p>
                  <p>3rd Line: {line3}</p>
                </div>
              </div>

              {
                doneMsg ? 
                  <section>
                    <div className="fadeInUp">
                      <p>Congratulations! Your Haiku is done!</p>
                    </div>
                    <div className="animation">
                      <Lottie animationData={animation} loop={false} style={{ width: 200, height: 200}}/>
                    </div>
                  </section>
                : null
              }
            </div> 
            </>
            : null}
          </main>
        </div> {/* content div */}
      </div> {/* wrapper div */}
      <Footer />
    </div> //App div
  );
}

export default App;
