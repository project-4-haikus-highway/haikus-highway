import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Alerts({ setShowAlert, setUserInput} ) {
    const element = <FontAwesomeIcon icon={faTimes} />
    
    //function to alert user when there's no more syllables left to add the chosen word
    const handleAlertClick = (event) => {
        event.preventDefault();
        setShowAlert(false);
        setUserInput('');
    };

    return (
        <div className="alertParent">
            <div className="alert">
                    <button onClick={handleAlertClick}><span className="sr-only">close alert</span>{element}</button>
                <p>Sorry, you don't have enough syllables to add this word, please try again!</p>
            </div>
        </div>
    );
};

export default Alerts;