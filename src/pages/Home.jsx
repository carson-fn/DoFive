import React, {useState, useEffect} from "react";
import ChallengeCard from "../components/ChallengeCard";

const challenge = {
    id: 1,
    title: "5min Abs",
    description: "Quick ab workout to strengthen core",
    dateCreated: "2025-11-08",
    lastCompleted: "2025-11-10",
    streak: 3,  
    notes: "",
    completedToday: true,
}

function Home(){
    // load challenge from localStorage
    const [challenge, setChallenge] = useState(() => {
        const saved = localStorage.getItem("challenge");
        return saved ? JSON.parse(saved) : null;
    });

    // save to localStorage when changed
    useEffect(() => {
        if (challenge) {
            localStorage.setItem("challenge", JSON.stringify(challenge));
        } else {
            localStorage.removeItem("challenge");
        }
    }, [challenge]);

    function createChallenge() {
        const newChallenge = {
        id: 1,
        title: "New Challenge",
        description: "Describe your challenge here",
        dateCreated: new Date().toISOString().split("T")[0],
        lastCompleted: null,
        streak: 0,
        notes: "",
        completedToday: false,
        };
        setChallenge(newChallenge);
    };

    function removeChallenge(){
        setChallenge(null)
    }

    return(
        <div>
            <h1>My Challenge</h1>
            {challenge ? (
                <>
                    <ChallengeCard challenge={challenge}/>
                    <button onClick={removeChallenge}>Remove</button>
                </>
            ) : (
                <>
                    <p>You don't have a challenge yet!</p>
                    <button onClick={createChallenge}>Create Challenge</button>
                </>
            )}

        </div>
    )
}

export default Home;