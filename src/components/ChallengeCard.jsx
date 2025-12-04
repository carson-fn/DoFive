import React, { useState } from 'react'
import "../styles/ChallengeCard.css"
import Timer from './Timer';

function ChallengeCard({ challenge, onComplete }) {
  // const { title, description, dateCreated, lastCompleted, streak, completedToday, notes, videoId } = challenge;
  const [timerOn, setTimerOn] = useState(false)

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";

    // ensure date does not get messed from time zone conversion
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // timer functions
  function startTimer() {
    setTimerOn(true)
  }

  function onTimerComplete() {
    setTimerOn(false)
    onComplete()
  }

  return (
    <div className="challenge-card">

      <div className="challenge-header">

        <h2 className="challenge-title">
          {challenge.title || "Unnamed Challenge"}
        </h2>

        <span className="streak-badge">
          {challenge.streak} 🔥
        </span>

      </div>

      <div className="challenge-body">

        <p className="challenge-description">{challenge.description}</p>

        <div className="challenge-info">
          <p><b>Started On:</b> {formatDate(challenge.dateStarted)}</p>
          {challenge.streakSince && (
            <p><b>Streak Since:</b> {formatDate(challenge.streakSince)}</p>
          )}
          {/* {challenge.lastCompleted && (
            <p><b>Last Completed:</b> {formatDate(challenge.lastCompleted)}</p>
          )} */}
        </div>

        {/* embedded video */}
        {challenge.videoId && (
          <div className="embedded-video">
            <iframe src={`https://www.youtube.com/embed/${challenge.videoId}`} title="Embedded Video" allow="fullscreen;"></iframe>
          </div>
        )}

        {/* notes */}
        {challenge.notes && (
          <div className="challenge-notes">
            <b>Notes:</b>
            <p>{challenge.notes}</p>
          </div>
        )}

        {/* finish challenge and start timer buttons */}
        {challenge.completedToday ? (
          <div className="button-group-on-card">
            <button className="complete-button">Finished!</button>
          </div>
        ) : (
          <div className="button-group-on-card">
            <button className="complete-button" onClick={onTimerComplete}>Finish</button>
            {!timerOn && <button className="start-timer-button" onClick={startTimer}>Start Timer</button>}
          </div>
        )}
      </div>

      {/* display timer at the bottom of the card when started */}
      {timerOn && (
        <Timer onComplete={onTimerComplete} />
      )}

    </div>
  );

}

export default ChallengeCard;