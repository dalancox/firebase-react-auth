import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Alert, Form } from 'react-bootstrap'
import { database } from "../../firebase";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { serverTimestamp } from "firebase/firestore";

import Layout from "../Layout";

function AddStory() {

    const storyTitle = useRef()
    const storyBody = useRef()
    const status = useRef() 
    const { currentUser } = useAuth()
    const [userData, setUserData] = useState([])

    const [error, setError] = useState('')

    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setError('')
            await database.stories.add({
                userID: currentUser.uid,
                storyTitle: storyTitle.current.value,
                storyBody: storyBody.current.value,
                status: status.current.value,
                username: userData.firstName,
                createdAt: serverTimestamp()
            })
            navigate('/')
        }catch{
            setError('failed to post story')
        }
        
    }

    useEffect(() => {
        const getUserName = async () => {
            const data = await database.users.doc(currentUser.uid).get()
            setUserData(data.data()) 
        }

        getUserName()
        // eslint-disable-next-line
    }, [])

    return(
        <>
        <Layout> 
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
            <Card style={{width: '75%'}}>
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
                        <Form.Control style={{height: '200px'}} as='textarea' type="text" ref={storyBody} required />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Status</Form.Label>
                        <Form.Select ref={status} required>
                            <option>Public</option>
                            <option>Private</option>
                        </Form.Select>
                    </Form.Group>
                    <Button className="w-100 mt-3" type='submit'>Submit Story!</Button>                
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </Layout>
        </>
    )
}

export default AddStory;