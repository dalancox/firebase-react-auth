import React from "react";

function PrivateStories({ stories }) {
    return(
        <>
            <div className="d-flex flex-column">
                <div>
                    <strong>You wrote,</strong>
                </div>
                <h1>{stories.storyTitle}</h1>
                <p>{stories.storyBody}</p>
            </div>
        </>
    )
}

export default PrivateStories