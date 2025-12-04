import { useState, useEffect } from "react";
import "../styles/Home.css"
import "../styles/buttons.css"
import ChallengeCard from "../components/ChallengeCard";
import PremadeChallengeList from "../components/PremadeChallengeList";
import WelcomePage from "../components/WelcomePage";

function getToday() {
    const local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toISOString().split("T")[0];
}

function getYesterday() {
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
    dateStarted: null,
    lastCompleted: null,
    streakSince: null,
    streak: 0,
    notes: "",
    completedToday: false,
    videoId: "",
    // videoId: "tgbNymZ7vqY",
}


function Home() {
    // load challenge from localStorage
    const [challenge, setChallenge] = useState(() => {
        let saved = localStorage.getItem("challenge");
        let updated;
        if (saved) {
            updated = JSON.parse(saved)
        } else {
            return null;
        }
        let today = getToday();
        let yesterday = getYesterday();

        // set completedToday
        if (updated.lastCompleted !== today) {
            updated = { ...updated, completedToday: false }
        }

        // check that streak is still valid
        if (updated.lastCompleted && updated.lastCompleted !== today && updated.lastCompleted !== yesterday) {
            updated = { ...updated, streak: 0, streakSince: null };
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

    // for creating challenges
    const [creating, setCreating] = useState(false);

    // for selecting premade challenges
    const [viewPremadeChallenges, setViewPremadeChallenges] = useState(false);
    function selectPremadeChallenge(premade) {
        let extended = { ...emptyChallenge, ...premade, dateStarted: getToday() };
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
        setCreating(true);
        const newChallenge = {
            ...emptyChallenge,
            id: 1,
            dateCreated: getToday(),
            dateStarted: getToday(),
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
        setViewPremadeChallenges(false)
    };

    function removeChallenge() {
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
        // if user is creating a challenge, then make sure to remove it on cancel
        if (creating) {
            setChallenge(null);
            setCreating(false);
        }
        setEditing(false);
    }

    // youtube link validation functions
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

        // return the id if it is valid, otherwise return empty string
        return valid ? id : "";
    }

    // validate youtube link anytime user clicks or tabs out of the input box
    async function handleVideoInputBlur(e) {
        let { value } = e.target;
        const id = await extractYouTubeId(value);

        setEditChallenge(prev => ({
            ...prev,
            videoId: id,
        }));
    }

    // for the editing/creating challenge form
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
        if (challenge.lastCompleted === today){return;};

        setChallenge(prev => ({
            ...prev,
            streak: prev.streak + 1,
            completedToday: true,
            lastCompleted: today,
            streakSince: prev.streak === 0 ? today : prev.streakSince,
        }));
    }



    return (
        <div className="home-page">

            {/* display challenge if user has one, otherwise display welcome page */}
            {challenge ? (
                <div className="challenge-container">
                    <h1>My Challenge</h1>

                    {/* display edit form if editing */}
                    {editing ? (
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
                            <div className="link-input-container">
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
                            </div>
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

                        // if not editing then display challenge
                        <>
                            <ChallengeCard challenge={challenge} onComplete={completeChallenge} />
                            <div className="button-group">
                                <button className="edit-button" onClick={startEditing}>Edit</button>
                                <button className="remove-button" onClick={removeChallenge}>Remove</button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                viewPremadeChallenges ? (
                    <PremadeChallengeList onAddChallenge={selectPremadeChallenge} onCreateChallenge={createChallenge} />
                ) : (
                    <WelcomePage onGetStartedClick={() => setViewPremadeChallenges(true)} />
                )
            )}

        </div>
    )
}

export default Home;