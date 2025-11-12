import {premadeChallenges} from "../data/premadeChallenges.js"

function PremadeChallengeList({onAddChallenge}){

    return (
        <div className="premade-challenge-list">
            <h2>Select a Challenge:</h2>
            <div className="premade-challenge-grid">
                {premadeChallenges.map((challenge) => (
                    <div className="premade-challenge-card" key={challenge.id}>
                        <h2 className="challenge-title">
                            {challenge.title || "Unnamed Challenge"}
                        </h2>
                        <p className="challenge-description">{challenge.description}</p>
                        <button className="add-premade-challenge-button" onClick={()=> onAddChallenge(challenge)}>Select</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PremadeChallengeList;