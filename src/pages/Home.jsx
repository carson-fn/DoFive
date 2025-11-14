import React, {useState, useEffect} from "react";
import "../styles/Home.css"
import ChallengeCard from "../components/ChallengeCard";
import PremadeChallengeList from "../components/PremadeChallengeList";

function getToday() {
  const local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().split("T")[0];
}

function getYesterday(){
    const local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    local.setDate(local.getDate() - 1)
    return local.toISOString().split("T")[0];
}

const emptyChallenge = {
    id: null,
    title: "",
    description: "",
    dateCreated: null,
    lastCompleted: null,
    streak: 0,
    notes: "",
    completedToday: false,
    videoId: "tgbNymZ7vqY",
}


function Home(){
    // load challenge from localStorage
    const [challenge, setChallenge] = useState(() => {
        let saved = localStorage.getItem("challenge");
        let updated;
        if(saved){
            updated = JSON.parse(saved)
        } else {
            return null;
        }
        let today = getToday();
        let yesterday = getYesterday();

        // set completedToday
        if (updated.lastCompleted != today){
            updated = {...updated, completedToday: false}
        }

        // check that streak is still valid
        if (updated.lastCompleted && updated.lastCompleted !== today && updated.lastCompleted !== yesterday) {
            updated = {...updated, streak: 0};
        }
    
        return updated;
    });

    // for editing challenges
    const [editing, setEditing] = useState(false);
    const [editChallenge, setEditChallenge] = useState({
        title: "",
        description: "",
        notes: "",
    });

    // for selecting premade challenges
    const [viewPremadeChallenges, setViewPremadeChallenges] = useState(false);
    function selectPremadeChallenge(premade){
        let extended = {...emptyChallenge, ...premade};
        setChallenge(extended)
        setViewPremadeChallenges(false)
    }     

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
            ...emptyChallenge,
            id: 1,
            dateCreated: getToday(),
        };
        setChallenge(newChallenge);

        setEditChallenge({
            title: "",
            description: "",
            videoId: "",
            notes: "",
            videoInput: "",
        });
        setEditing(true);
    };

    function removeChallenge(){
        setChallenge(null)
    }

    // editing functions
    function startEditing() {
        let videoInput = challenge.videoId ? `youtu.be/${challenge.videoId}` : "";

        setEditChallenge({
            title: challenge.title,
            description: challenge.description,
            videoId: challenge.videoId,
            notes: challenge.notes,
            // videoInput is only stored for the editing form, it does not go into the actual challenge object
            videoInput: videoInput,
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

    async function isValidYouTubeId(videoId) {
        const url = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const response = await fetch(url, { method: "HEAD" });
        return response.ok;
    }

    async function extractYouTubeId(input) {
        if (!input) return "";
        let id = "";

        // regex pattern to cover multiple types of youtube links and extract the id
        const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
        const match = input.match(regex);

        if (match) id = match[1];
        else if (/^[A-Za-z0-9_-]{11}$/.test(input)) id = input;
        else id = "";

        let valid = await isValidYouTubeId(id);

        return valid ? id : "";

        // user input does not match a youtube link
        return "";
    }

    async function handleVideoInputBlur(e){
        let { name, value } = e.target;
        const id = await extractYouTubeId(value);

        setEditChallenge(prev => ({
            ...prev,
            videoId: id,
        }));
    }

    function handleChange(e) {
        let { name, value } = e.target;

        setEditChallenge(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // completing a challenge for the day
    function completeChallenge() {
        const today = getToday();
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
                        <input
                            type="text"
                            name="videoInput"
                            placeholder="Paste a YouTube link or ID"
                            value={editChallenge.videoInput}
                            onChange={handleChange}
                            onBlur={handleVideoInputBlur}
                        />
                        {editChallenge.videoInput.length > 0 && (
                            <p className={editChallenge.videoId ? "valid-link" : "invalid-link"}>
                                {editChallenge.videoId ? "✔ Valid link" : "✘ Invalid link"}
                            </p>
                        )}

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
                viewPremadeChallenges ? (
                    <PremadeChallengeList onAddChallenge={selectPremadeChallenge}/>
                ) : (
                    <>
                        <p>You don't have a challenge yet!</p>
                        <div className="button-group">
                            <button className="create-button" onClick={createChallenge}>Create Custom Challenge</button>
                            <button className="create-button" onClick={()=> setViewPremadeChallenges(true)}>Use Premade Challenge</button>
                        </div>
                    </>
                )
            )}

        </div>
    )
}

export default Home;