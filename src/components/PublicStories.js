import React from "react";
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function PublicStories({ stories }) {
    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title>
                    <h3><Link to={`/u/${stories.userID}`}>{stories.username}</Link> wrote,</h3>
                </Card.Title>
                <Card.Text>{stories.storyBody}</Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default PublicStories