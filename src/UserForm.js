import axios from "axios";
import { useState } from "react";

function UserForm() {
    const [soundsLike, setSoundsLike] = useState([])
    const [userInput, setUserInput] = useState('')

    const apiCall = (userInput) =>{
        axios({
            url: 'https://api.datamuse.com/words?',
            method: 'GET',
            dataResponse: 'json',
            params: {
                sl: userInput,
                md: 's'
            }
        }).then((res) => {
            console.log(res.data)
            setSoundsLike(res.data)
            wordSearch()
        })
    }

    const handleChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        apiCall(userInput)
    
    } 
    const wordSearch = () => {
    const copyOfApiData = [...soundsLike]
    const filteredApiData = copyOfApiData.filter( (wordArray => {
        return( wordArray.word === userInput)  
    }))
    console.log(filteredApiData);
}
    return(

        <form action="submit" onSubmit={handleSubmit}>
            <label htmlFor=""></label>
            <input type="text" value={userInput} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>

    )
};

export default UserForm