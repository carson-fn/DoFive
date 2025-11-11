import React, {useState, useEffect} from "react";
import "../styles/Home.css"
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

    // for editing challenges
    const [editing, setEditing] = useState(false);
    const [editChallenge, setEditChallenge] = useState({
        title: "",
        description: "",
        notes: "",
    });

    // save to localStorage when changed
    useEffect(() => {
        if (challenge) {
            localStorage.setItem("challenge", JSON.stringify(challenge));
        } else {
            localStorage.removeItem("challenge");
        }
    }, [challenge]);

    // create/remove functions
    function createChallenge() {
        const newChallenge = {
            id: 1,
            title: "",
            description: "",
            dateCreated: new Date().toISOString().split("T")[0],
            lastCompleted: null,
            streak: 0,
            notes: "",
            completedToday: false,
        };
        setChallenge(newChallenge);

        setEditChallenge({
            title: "",
            description: "",
            notes: "",
        });
        setEditing(true);
    };

    function removeChallenge(){
        setChallenge(null)
    }

    // editing functions
    function startEditing() {
        setEditChallenge({
            title: challenge.title,
            description: challenge.description,
            notes: challenge.notes,
        });
        setEditing(true);
    }

    function saveEdit() {
        setChallenge({
            ...challenge,
            ...editChallenge,
        });
        setEditing(false);
    }

    function cancelEdit() {
        setEditing(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditChallenge(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // completing a challenge for the day
    function completeChallenge() {
        const today = new Date().toISOString().split("T")[0];
        setChallenge(prev => ({
            ...prev,
            streak: prev.streak + 1,
            completedToday: true,
            lastCompleted: today,
        }));
    }



    return(
        <div>
            <h1>My Challenge</h1>
            {challenge ? (
                editing ? (
                    <div className="edit-challenge-form">
                        <input
                            type="text"
                            name="title"
                            placeholder="Challenge Title"
                            value={editChallenge.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={editChallenge.description}
                            onChange={handleChange}
                        />
                        <textarea
                            name="notes"
                            placeholder="Notes"
                            value={editChallenge.notes}
                            onChange={handleChange}
                        />
                        <div className="button-group">
                            <button className="save-button" onClick={saveEdit}>Save</button>
                            <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <ChallengeCard challenge={challenge} onComplete={completeChallenge}/>
                         <div className="button-group">
                            <button className="edit-button" onClick={startEditing}>Edit</button>
                            <button className="remove-button" onClick={removeChallenge}>Remove</button>
                        </div>
                    </>
                )
            ) : (
                <>
                    <p>You don't have a challenge yet!</p>
                    <button className="create-button" onClick={createChallenge}>Create Challenge</button>
                </>
            )}

        </div>
    )
}

export default Home;