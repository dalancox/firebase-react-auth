import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function PublicStories({ stories }) {

    const notTruncatedStory = stories

    if (stories.storyBody.length > 300) {
        stories.storyBody = stories.storyBody.slice(0, 150).concat('...')
    }

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title>
                    <h3><Link to={`/u/${stories.userID}`}>{stories.username}</Link> wrote,</h3>
                </Card.Title>
                <Card.Text>
                    {stories.storyBody}
                </Card.Text>
                    {
                        stories.storyBody.includes('...') &&
                        <Link to='/'>See more</Link>
                    }
            </Card.Body>
        </Card>
        </>
    )
}

export default PublicStories