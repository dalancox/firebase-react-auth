import React, { useState, useEffect } from "react";
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { database } from '../firebase'
import { useNavigate } from 'react-router-dom'

import Profile from "./Profile";
import WriteStory from "./WriteStory";

function Dashboard() {
    const [error, setError] = useState('')
    const [stories, setStories] = useState([])
    const { logout, currentUser } = useAuth()
    let navigate = useNavigate()

    

    const handleDelete = (docId) => {
        database.stories.doc(docId).delete()
    }

    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
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
        <div style={{display: 'flex', width: '100%', height: '100vh'}}>

        <div style={{width: '75%'}}>
            {
                stories.map((stories) => {
                    return (
                    <>
                        <div key={stories.id}>
                            <h1>{stories.storyTitle}</h1>
                            <p>{stories.storyBody}</p>
                            <Button onClick={() => handleDelete(stories.id)}>Delete</Button>
                            <Button>Update Story</Button>
                        </div>
                    </>
                    )
                })
            }
        </div>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '25%', borderLeft: '1px solid #ddd'}}>
            <div>
                <Profile />
                <WriteStory story={stories.length} />
            </div>

            <div className='w-100 text-center mb-5'>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
        </div>      
        </>
    )
}

export default Dashboard