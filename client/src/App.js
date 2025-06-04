import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:5000/')
    .then(res => res.text())
    .then(data => setMessage(data));
  }, []);

  return(
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
