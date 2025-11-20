import {premadeChallenges} from "../data/premadeChallenges.js"
import "../styles/PremadeChallengeList.css"

function PremadeChallengeList({onAddChallenge, onCreateChallenge}){

    return (
        <div className="premade-challenge-list">
            <div className="premade-challenge-list-header">
                <h2>Select a Challenge</h2>
                <div>
                <h2>Or</h2>
                <button className="create-challenge-button" onClick={onCreateChallenge}>Create my own</button>
                </div>
            </div>
            <div className="premade-challenge-grid">
                {premadeChallenges.map((challenge) => (
                    <div className="challenge-card" key={challenge.id}>
                        <div className="challenge-header">
                            <h2 className="challenge-title">
                                {challenge.title || "Unnamed Challenge"}
                            </h2>
                             <button className="select-premade-challenge-button" onClick={()=> onAddChallenge(challenge)}>Select</button>
                        </div>
                        <div className="challenge-body">
                            <p className="challenge-description">{challenge.description}</p>
                            {challenge.videoId && (
                                <div className="embedded-video">
                                <iframe src={`https://www.youtube.com/embed/${challenge.videoId}`} title="Embedded Video" allow="fullscreen;"></iframe>
                                </div>
                            )}
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PremadeChallengeList;