import React from "react";

function Stories({ stories }) {

    return(
        <>
            <div>
                <strong>{stories.username} wrote,</strong>
                <h1>{stories.storyTitle}</h1>
                <p>{stories.storyBody}</p>
            </div>
        </>
    )
}

export default Stories