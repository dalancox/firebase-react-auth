import React from "react";

function Stories({ stories }) {

    return(
        <>
            <div key={stories.id}>
                <h1>{stories.storyTitle}</h1>
                <p>{stories.storyBody}</p>
            </div>
        </>
    )
}

export default Stories