import {premadeChallenges} from "../data/premadeChallenges.js"
import "../styles/PremadeChallengeList.css"

function PremadeChallengeList({onAddChallenge}){

    return (
        <div className="premade-challenge-list">
            <h2>Select a Challenge:</h2>
            <div className="premade-challenge-grid">
                {premadeChallenges.map((challenge) => (
                    <div className="challenge-card" key={challenge.id}>
                        <h2 className="challenge-title">
                            {challenge.title || "Unnamed Challenge"}
                        </h2>
                        <p className="challenge-description">{challenge.description}</p>
                        <button className="select-premade-challenge-button" onClick={()=> onAddChallenge(challenge)}>Select</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PremadeChallengeList;