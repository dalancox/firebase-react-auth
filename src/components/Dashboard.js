import React, { useState, useEffect } from "react";
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { database } from '../firebase'
import { useNavigate } from 'react-router-dom'

import Profile from "./Profile";
import WriteStory from "./WriteStory";

function Dashboard() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [stories, setStories] = useState([])
    const { logout, currentUser } = useAuth()
    let navigate = useNavigate()

    async function handleLogout() {
        setError('')
        try {
            await logout()
        } catch {
            setError('Failed to log out')
        }
    }

    const handleDelete = (docId) => {
        setSuccess('')
        try {
            database.stories.doc(docId).delete()
            setSuccess('succesfully deleted story.')
            navigate('/')
        } catch {
            setSuccess('Something went wrong')
        }
    }


    useEffect(() => {
        const getStories = async () => {
            const data = await database.stories.where('userID', '==', currentUser.uid).get()
            setStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getStories()
    }, [])

    return (
        <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>

        <div style={{width: '75%', margin: '1rem'}}>
        {success && <Alert variant="success">{success}</Alert>}
            {
                stories.map((stories) => {
                    return (
                    <div key={stories.id} style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>
                        <h1>{stories.storyTitle}</h1>
                        <p>{stories.storyBody}</p>
                        <Button onClick={() => handleDelete(stories.id)}>Delete</Button>
                        <Button>Update Story</Button>
                    </div>
                    )
                })
            }
        </div>

        <div style={{position: 'sticky', top: '0', right: '0', width: '300px', height: '100vh', borderLeft: '1px solid #ddd'}}>
            <div>
                <Profile />
                <WriteStory story={stories.length} />
            </div>

            <div className='w-100 text-center mb-5' style={{position: 'absolute', bottom: '0'}}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
        </div>      
        </>
    )
}

export default Dashboard