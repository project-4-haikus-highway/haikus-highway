import UserForm from './UserForm';
import MakeHaiku from './MakeHaiku';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Haikus Highway</h1>
      <UserForm />
      <MakeHaiku />
    </div>
  );
}

export default App;
