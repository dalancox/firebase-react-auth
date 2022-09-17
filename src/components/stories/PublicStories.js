import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function PublicStories({ stories }) {

    if (stories.storyBody.length > 300) {
        stories.storyBody = stories.storyBody.slice(0, 150).concat('...')
    }
    
    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title>
                    <h5><Link to={`/u/${stories.userID}`}>{stories.username}</Link> wrote,</h5>
                    <h1>{stories.storyTitle}</h1>
                </Card.Title>
                <Card.Text>
                    {stories.storyBody}
                </Card.Text>
                    {
                        stories.storyBody.includes('...') &&
                        <Link to={`/story/${stories.id}`}>See more</Link>
                    }
            </Card.Body>
        </Card>
        </>
    )
}

export default PublicStories