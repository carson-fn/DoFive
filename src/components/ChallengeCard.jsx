import React, {useState} from 'react'
import "../styles/ChallengeCard.css"
import Timer from './Timer';

function ChallengeCard({challenge, onComplete}){
    const { title, description, dateCreated, lastCompleted, streak, completedToday, notes, videoId } = challenge;
    const [timerOn, setTimerOn] = useState(false)

    function formatDate(dateStr){
        if (!dateStr) return "N/A";

        // ensure date does not get messed from time zone conversion
        const [year, month, day] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day); // month is 0-indexed

        return date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"});
    };    

    function startTimer(){
      setTimerOn(true)
    }

    function onTimerComplete(){
      setTimerOn(false)
      onComplete()
    }

    return (<>
      {!timerOn ? (
    <div className="challenge-card">
      <div className="challenge-header">
        <h2 className="challenge-title">
          {challenge.title || "Unnamed Challenge"}
        </h2>
        <span className="streak-badge">
          {challenge.streak} 🔥
        </span>
      </div>

      <p className="challenge-description">{challenge.description}</p>

      <div className="challenge-info">
        <p><b>Created:</b> {formatDate(challenge.dateCreated)}</p>
        {challenge.lastCompleted && (
          <p><b>Last Completed:</b> {formatDate(challenge.lastCompleted)}</p>
        )}
      </div>

      {videoId && (
        <div className="embedded-video">
          <iframe src={`https://www.youtube.com/embed/${videoId}`} title="Embedded Video" allow="fullscreen;"></iframe>
        </div>
      )}

      {challenge.notes && (
        <div className="challenge-notes">
          <b>Notes:</b>
          <p>{challenge.notes}</p>
        </div>
      )}

      {!completedToday && (
        <div className="button-group">
          <button className="start-timer-button" onClick={startTimer}>Start Timer</button>
          <button className="complete-button" onClick={onComplete}>Finish</button>
        </div>
      )}
    </div>
      ) : (
        <Timer onComplete={onTimerComplete}/>
      )}
      </>
  );
  
}

export default ChallengeCard;