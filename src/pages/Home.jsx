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
    return(
        <div>
            <h1>My Challenge</h1>
            <ChallengeCard challenge={challenge}/>
        </div>
    )
}

export default Home;