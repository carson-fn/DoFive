import { useState, useEffect } from "react";
import "../styles/Timer.css"

function Timer({onComplete}) {
    // total time in seconds
    const totalTime = 5 * 60;

    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [timerOn, setTimerOn] = useState(true);

    useEffect(() => {
        let interval = null;

        if (timeLeft === 0){
            onComplete()
        }

        // set an interval for 1 second, subtracts 1 from timeLeft once complete
        if (timerOn && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (!timerOn && interval) {
            // clear this interval if timer is not running
            clearInterval(interval);
        }

        // interval will be cleared on any change to timerOn or timeLeft
        return () => clearInterval(interval);
        
    }, [timerOn, timeLeft, onComplete]); // Netlify said to add onComplete here because it is a stable prop

    // timer button onClick functions
    function startTimer() {
        if (timeLeft === 0) setTimeLeft(totalTime);
        setTimerOn(true);
    };

    function stopTimer() {
        setTimerOn(false)
    };

    function resetTimer() {
        setTimerOn(false);
        setTimeLeft(totalTime);
    };

    // format time into minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="timer-container">
            <h2>
                {minutes}:{seconds.toString().padStart(2, "0")}
            </h2>
            <div className="button-group">
                {!timerOn ? (
                    <button onClick={startTimer}>Start</button>
                ) : (
                    <button onClick={stopTimer}>Pause</button>
                )}
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;
