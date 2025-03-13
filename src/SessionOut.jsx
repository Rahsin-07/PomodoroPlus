


import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { GrPowerReset } from "react-icons/gr";
import { FaPause } from "react-icons/fa6";

const SessionOut = () => {
  const [breaklength, setBreaklength] = useState(5);
  const [sessionlength, setSessionlength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionlength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    setTimeLeft(sessionlength * 60);
  }, [sessionlength]);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 0) {
            document.getElementById("beep").play();
            setIsBreak(!isBreak);
            return isBreak ? sessionlength * 60 : breaklength * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isBreak, sessionlength, breaklength]);

  const handleStartStop = () => {
    setIsRunning(prev => !prev);
    
  };

  const handleReset = () => {
    setSessionlength(25);
    setBreaklength(5);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <div id="break-session-box">
        <div id="break-label-box">
          <div id="break-label">
            Break Length
            <div id="break-timer">
              <button
                id="break-decrement"
                onClick={() =>
                  setBreaklength(prev => Math.max(1, prev - 1))
                }
              >
                <FaArrowDown />
              </button>
              <p id="break-length">{breaklength}</p>
              <button
                id="break-increment"
                onClick={() =>
                  setBreaklength(prev => Math.min(60, prev + 1))
                }
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
        <div id="session-label-box">
          <div id="session-label">
            Session Length
            <div id="session-timer">
              <button
                id="session-decrement"
                onClick={() =>
                  setSessionlength(prev => {
                    const newLength = Math.max(1, prev - 1);
                    setTimeLeft(newLength * 60);
                    return newLength;
                  })
                }
              >
                <FaArrowDown />
              </button>
              <p id="session-length">{sessionlength}</p>
              <button
                id="session-increment"
                onClick={() =>
                  setSessionlength(prev => {
                    const newLength = Math.min(60, prev + 1);
                    setTimeLeft(newLength * 60);
                    return newLength;
                  })
                }
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="timer-label">
        <div id="timer-display-box">
          <div id="timer-display">
            {isBreak ? "Break" : "Session"}
            <p id="time-left">
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          </div>
        </div>
        <div id="controller">
          <div id="start_stop">
            <button onClick={handleStartStop}>
              {isRunning ? <FaPause /> : <VscDebugStart />}
            </button>
          </div>
          <button id="reset" onClick={handleReset}>
            <GrPowerReset />
          </button>
        </div>
      </div>
      <audio  id="beep" src="/off-hook-tone-43891.mp3"></audio>
    </div>
  );
};

export default SessionOut;
