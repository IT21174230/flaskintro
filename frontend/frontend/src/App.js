import './App.css';
import { useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input} from './form'

function App() {

  const [welcome, setWelcome]=useState(null)

  function getData(){
    axios({method:'GET', url: 'http://127.0.0.1:5000/'})
    .then((response)=>{
      const res=response.data
      console.log(response.data)
      setWelcome(({
        data:res.data
      }))
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>welcome to the front end</p>
        <button onClick={getData}>Say hello to the backend</button>
        {welcome && <p>{welcome.data}</p>}
        <Input></Input>
      </header>
    </div>
  );
}

export default App;
