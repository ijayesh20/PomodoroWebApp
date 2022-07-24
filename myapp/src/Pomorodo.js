import React, { useState, useEffect} from "react";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(3);
  const [startTimer,setStartTimer] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [session,setSession] = useState(1)
  var interval;

  function start() {
    if(session>0) {
      setStartTimer(true)
    }
  }
  function getTime() {
    if (seconds === 0) {
      if (minutes !== 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } 
      else {
        let minutes = displayMessage ? 24 : 4;
        let seconds = 59;

        setSeconds(seconds);
        setMinutes(minutes);
        setDisplayMessage(!displayMessage);

        if(displayMessage) {
          setSession(prevValue=>prevValue-1)
        }
      }
    } 
    else {
      setSeconds(seconds - 1);
    }
  }
  useEffect(() => {
    if(startTimer && session>0) {
      interval = setInterval(() => {
        clearInterval(interval);
        getTime();
      }, 1000);
    }
    return () => clearInterval(interval)
  }, [seconds,startTimer]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="pomodoro">
      <h1 className="heading">Pomodoro Timer</h1>
      <label>Number of Cycles Left</label>
      <input 
        type="number" 
        value={session}
        placeholder="Enter number of cycles"
        onChange={(e)=>setSession(parseInt(e.target.value))}/>
      {displayMessage?<p className="message">Break time!</p>:<p className="message">Time to Focus!</p>}
      <div className="timer">{timerMinutes}:{timerSeconds}</div>
      <button onClick={start}>Start</button>
    </div>
  );
}