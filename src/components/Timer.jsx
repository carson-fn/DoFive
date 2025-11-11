import React, { useState, useEffect } from "react";

function Timer({onComplete}) {
    const totalTime = 3;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        let interval = null;

        if (timeLeft == 0){
            onComplete()
        }

        // set an interval for 1 second, subtracts 1 from timeLeft once complete
        if (timerOn && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (!timerOn && interval) {
            clearInterval(interval);
        }

        // interval will be cleared on any change to timerOn or timeLeft
        return () => clearInterval(interval);
    }, [timerOn, timeLeft]);

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
