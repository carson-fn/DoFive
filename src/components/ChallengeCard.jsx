
function ChallengeCard({challenge}){
    const { title, description, dateCreated, lastCompleted, streak, completedToday, notes } = challenge;

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
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