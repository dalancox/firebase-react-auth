import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

import { database } from "../firebase";
import { getDoc } from "firebase/firestore"

import { Card, Button, Alert, Form } from 'react-bootstrap'

import Layout from "./Layout";

function UpdateStory() {
    const [publicStories, setPublicStories] = useState([]);

    let params = useParams()
    let navigate = useNavigate()

    const storyTitleRef = useRef()
    const storyBodyRef = useRef()
    const statusRef = useRef() 

    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setError('')
            const dataRef = database.stories.doc(`${params.storyId}`)
            await dataRef.update({
                storyTitle: storyTitleRef.current.value,
                storyBody: storyBodyRef.current.value,
                status: statusRef.current.value
            })
            navigate('/')
        } catch {
            setError('Failed to update story')
        }

    }

    useEffect(() => {
        const getPublicStories = async () => {
            const dataRef = database.stories.doc(`${params.storyId}`)
            const dataSnap = await getDoc(dataRef)

            if(dataSnap.exists()) {
                setPublicStories({ ...dataSnap.data(), id: dataSnap.id })
            } else {
                console.log('error')
            }
        }

        getPublicStories()
    }, [params])


    return (
        <>
        <Layout> 
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
            <Card style={{width: '75%'}}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update our story</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="story-title">
                        <Form.Label>Story Title</Form.Label>
                        <Form.Control type="text" defaultValue={publicStories.storyTitle} ref={storyTitleRef} required />
                    </Form.Group>
                    <Form.Group id="story-body">
                        <Form.Label>Your Story:</Form.Label>
                        <Form.Control style={{height: '200px'}} as='textarea' type="text" defaultValue={publicStories.storyBody} ref={storyBodyRef} required />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Status</Form.Label>
                        <Form.Select defaultValue={publicStories.status} ref={statusRef} required>
                            <option>Public</option>
                            <option>Private</option>
                        </Form.Select>
                    </Form.Group>
                    <Button className="w-100 mt-3" type='submit'>Update Story!</Button>                
                    </Form>
                </Card.Body>
            </Card>
        </div>
        </Layout>
        </>
    )
}

export default UpdateStory