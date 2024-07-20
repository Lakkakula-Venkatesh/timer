import React from "react";

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      minute: 0,
      second: 0,
      runningTime: 0,
      intervalId: -1
    }

    this.startTimer = this.startTimer.bind(this);
    
  }

  // eslint-disable-next-line no-unreachable
  startTimer = function() {
    const time = this.state.minute * 60 + this.state.second;
    this.setState({runningTime: time})
    console.log(this.state.runningTime);

    let intervalId = setInterval(() => {
      if(this.state.runningTime === 0) {
        clearInterval(intervalId);
        return;
      }
      this.setState({runningTime: this.state.runningTime - 1});
    }, 1000);

    this.setState({intervalId: intervalId});
    return;
  }

  getFormattedTime = () => {
    if(this.state.runningTime === 0) {
      return "00 : 00";
    }
    const minutes = parseInt(this.state.runningTime / 60);
    const seconds = parseInt(this.state.runningTime % 60);

    return `${minutes} : ${seconds}`;
  }

  render() {
    return (
      <>
        <label>Minute</label>
        <input onChange={(e) => this.setState({minute: parseInt(e.target.value)})} />
        <label>Seconds</label>
        <input onChange={(e) => this.setState({second: parseInt(e.target.value)})} />
        <div>{this.getFormattedTime()}</div>
        <button onClick={this.startTimer}>Start</button>
        {/* <button onClick={pauseTimer}>Pause</button>
        <button onClick={resumeTimer}>Resume</button>
        <button onClick={resetTimer}>Reset</button> */}
      </>
    )
  }
}

export default Timer;