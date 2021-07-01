import axios from "axios";

function UserForm({ setSearchedWord, userInput, setUserInput, setIsLoading } ) {

  const apiCall = (userInput) => {
    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      dataResponse: 'json',
      params: {
        max: 100, 
        sl: userInput,
        md: 's'
      }
    }).then((res) => {
      userInputFilter(res.data);
      setIsLoading(false);
      
    })
  }

  const userInputFilter = (apiData) => {
    const copyOfApiData = [...apiData]
    const filteredApiData = copyOfApiData.filter((wordArray => {
      return (wordArray.word === userInput)
    }))
    setSearchedWord(filteredApiData)
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

    <div className="formContainer">
      
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="">Please enter a word to make your haiku</label>
        <input type="text" value={userInput} onChange={handleChange} pattern="[A-Za-z]+" title="Only alphabetical letters." placeholder="Hey.."/>
        <button type="submit">Search</button>
      </form>
    </div>
  )

}

export default UserForm;