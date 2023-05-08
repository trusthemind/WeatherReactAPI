import logo from './logo.svg';
import './App.css';
import Top from './components/TopContainer/Top';
import Bottom from './components/BottomContainer/Bottom';
import { useState } from 'react';

function App() {
  let [dataTransfer, setTransfer] = useState(null);
  let getData = (data) => {
    if (data)
      setTransfer(data);
  }

  return (
    <div className="App">
      <Top data={getData} />
      <Bottom sendData={dataTransfer} />
    </div>
  );
}

export default App;
