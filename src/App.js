import React, { useState } from 'react';
import './App.css';
import Timer from "./Timer";

function App() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [runningTime, setRunningTime] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [paused, setPaused] = useState(false);

  const pauseTimer = () => {
    clearInterval(intervalId);
    setPaused(prevState => true);
    setIntervalId(prevState => -1)
  }

  const resetTimer = () => {
    clearInterval(intervalId);
    setIntervalId(prevState => -1)
    setPaused(prevState => false);
    setRunningTime(prevState => minute * 60 + second);
  }

  const resumeTimer = () => {
    if(!paused)
      return;
    
    setPaused(prevState => false);
    let intervalId = setInterval(() => {
      setRunningTime((prevState) => {
        return prevState > 0 ? prevState - 1 : 0
      });
    }, 1000);

    setIntervalId(prevState => intervalId);
  }

  const startTimer = () => {
    const time = minute * 60 + second;
    setRunningTime(prevState => time);
    setPaused(prevState => false);

    let intervalId = setInterval(() => {
      setRunningTime((prevState) => {
        return prevState > 0 ? prevState - 1 : 0
      });
    }, 1000);

    setIntervalId(prevState => intervalId);
  }

  const getFormattedTime = () => {
    if(runningTime === 0) {
      return "00 : 00";
    }
    const minutes = parseInt(runningTime / 60);
    const seconds = parseInt(runningTime % 60);

    return `${minutes} : ${seconds}`;
  }

  return (
    <div className="App">
      <header className="App-header">
        <label>Minutes</label>
        <input onChange={(e) => setMinute(parseInt(e.target.value))} />
        <label>Seconds</label>
        <input onChange={(e) => setSecond(parseInt(e.target.value))} />
        <div>{getFormattedTime()}</div>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resumeTimer}>Resume</button>
        <button onClick={resetTimer}>Reset</button>
        {/* <Timer /> */}
      </header>
    </div>
  );
}

export default App;
