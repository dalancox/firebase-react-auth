import React from "react";

function PrivateStories({ stories }) {
    return(
        <>
        {
            stories.length === 0 && 
            <h1>You have no stories!</h1>
        }
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