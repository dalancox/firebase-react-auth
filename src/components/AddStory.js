import React from "react";
import { useRef, useState } from "react";
import { Card, Button, Alert, Form } from 'react-bootstrap'
import { database } from "../firebase";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'

function AddStory() {

    const storyTitle = useRef()
    const storyBody = useRef()
    const { currentUser } = useAuth()

    const [error, setError] = useState('')

    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setError('')
            await database.stories.add({
                userID: currentUser.uid,
                storyTitle: storyTitle.current.value,
                storyBody: storyBody.current.value
            })
            navigate('/')
        }catch{
            setError('failed to post story')
        }
        
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Write your story</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="story-title">
                        <Form.Label>Story Title</Form.Label>
                        <Form.Control type="text" ref={storyTitle} required />
                    </Form.Group>
                    <Form.Group id="story-body">
                        <Form.Label>Your Story:</Form.Label>
                        <Form.Control type="text" ref={storyBody} required />
                    </Form.Group>
                    <Button className="w-100" type='submit'>Submit Story!</Button>                
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default AddStory;