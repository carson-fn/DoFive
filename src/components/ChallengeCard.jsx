import { computeHeadingLevel } from "@testing-library/dom";
import "../styles/ChallengeCard.css"
function ChallengeCard({challenge, onComplete}){
    const { title, description, dateCreated, lastCompleted, streak, completedToday, notes } = challenge;

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";

        // ensure date does not get messed from time zone conversion
        const [year, month, day] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day); // month is 0-indexed

        return date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"});
    };    

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

      <p className="challenge-description">{challenge.description}</p>

      <div className="challenge-info">
        <p><b>Created:</b> {challenge.dateCreated}</p>
        {challenge.lastCompleted && (
          <p><b>Last Completed:</b> {challenge.lastCompleted}</p>
        )}
      </div>

      {challenge.notes && (
        <div className="challenge-notes">
          <b>Notes:</b>
          <p>{challenge.notes}</p>
        </div>
      )}

      {!completedToday && (
        <button className="complete-button" onClick={onComplete}>Finish</button>
      )}
    </div>
  );
}

export default ChallengeCard;