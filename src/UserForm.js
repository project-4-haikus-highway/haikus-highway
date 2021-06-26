import axios from "axios";
import { useEffect,useState } from "react";

function UserForm() {
    const [soundsLike, setSoundsLike] = useState([])
    const [userInput, setUserInput] = useState('')
    const [enteredWord, setEnteredWord] = useState([])

    const apiCall = (userInput) =>{
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
            console.log(res.data)
            setSoundsLike(res.data)
            // wordSearch()
        })
    }



    const handleChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        apiCall(userInput)
    
    } 
    useEffect (() => {
        console.log('hi');
        const copyOfApiData = [...soundsLike]
        const filteredApiData = copyOfApiData.filter( (wordArray => {
        return( wordArray.word === userInput)  
        }))
        setEnteredWord(filteredApiData[0])
        console.log(filteredApiData);
    },[soundsLike])

    return(

        <section><form action="submit" onSubmit={handleSubmit}>
            <label htmlFor=""></label>
            <input type="text" value={userInput} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
        <ul>
            {/* <li>{enteredWord.word} </li> */}
        </ul>
        </section>

    )
};

export default UserForm