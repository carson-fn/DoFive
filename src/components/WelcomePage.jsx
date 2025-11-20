import "../styles/WelcomePage.css"

function WelcomePage({ onGetStartedClick }) {
    return (
        <div className="welcome-page">
            <div className="welcome-page-header">
                <h1>Welcome to DO FIVE</h1>
            </div>
            <div className="welcome-page-body">
                <p>
                    Think of that one goal that you have always had but never got around to.
                    Was it to learn a new language? How about getting a 6-pack? Or to
                    just spend more time with nature? Who knows, maybe you didn't have
                    time for it, maybe you were just too lazy... (no shame, we've all been
                    there). That's why DO FIVE is here, to keep you accountable in the
                    small steps it takes to achieve your goals. However big or small it
                    may be, just 5 minutes a day is all it takes.
                </p>
                <p>(I guarantee you can take 5 minutes out of your screen time for this)</p>

                <button className="get-started-button" onClick={onGetStartedClick}>Get Started</button>

            </div>
        </div>
    )
}

export default WelcomePage;