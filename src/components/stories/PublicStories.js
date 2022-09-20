import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function PublicStories({ stories }) {
    const [success, setSuccess] = useState(false)
    const handleClose = () => {setSuccess(false)}
    let truncatedStory = null

    const handleStory = () => {
        setSuccess(true)
    }

    if (stories.storyBody.length > 300) {
        truncatedStory = stories.storyBody.slice(0, 150).concat('...')
    }
    
    return (
        <>

        <Modal show={success} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{stories.username}'s Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {stories.storyBody}
            </Modal.Body>
        </Modal>
        <Card>
            <Card.Body>
                <Card.Title>
                    <h5><Link to={`/u/${stories.userID}`}>{stories.username}</Link> wrote,</h5>
                    <h1>{stories.storyTitle}</h1>
                </Card.Title>
                    {truncatedStory ? <p>{truncatedStory}</p>:<p>{stories.storyBody}</p>}
                    {
                        stories.storyBody.length > 300 && 
                        <Button variant="link" onClick={handleStory} >See More</Button>
                    }
            </Card.Body>
        </Card>
        </>
    )
}

export default PublicStories