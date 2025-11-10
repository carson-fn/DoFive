
function ChallengeCard({challenge}){
    const { title, description, dateCreated, lastCompleted, streak, completedToday, notes } = challenge;

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";

        // ensure date does not get messed from time zone conversion
        const [year, month, day] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day); // month is 0-indexed

        return date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"});
    };    

    return(
        <div className="challenge-card">
            <h2>{title}</h2>
            <p className="description">{description}</p>
            <div className="challenge-info">
                <p>Created: {formatDate(dateCreated)}</p>
                <p>Streak: {streak}</p>
                {notes && <p><strong>Notes:</strong> {notes}</p>}
            </div>
        </div>
    )
}

export default ChallengeCard;