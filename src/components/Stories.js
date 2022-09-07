import React from "react";
import { Link } from 'react-router-dom'

function Stories({ stories }) {
    return(
        <>
            <div className="d-flex flex-column">
                <div>
                    <strong><Link to={`/u/${stories.userID}`}>{stories.username}</Link> wrote,</strong>
                </div>
                <h1>{stories.storyTitle}</h1>
                <p>{stories.storyBody}</p>
            </div>
        </>
    )
}

export default Stories