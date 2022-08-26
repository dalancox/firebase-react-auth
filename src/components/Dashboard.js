import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../firebase'

function Dashboard() {
    const [error, setError] = useState('')
    const [stories, setStories] = useState([])
    const [storyCount, setStoryCount] = useState(0)
    const { currentUser, logout } = useAuth()
    let navigate = useNavigate()

    const currentUserId = currentUser.uid;

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    const handleDelete = (docId) => {
        database.stories.doc(docId).delete()
    }

    useEffect(() => {

        const getStories = async () => {
            const data = await database.stories.where('userID', '==', currentUserId).get()
            setStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        const getStoryCount = async () => {
            const data = await database.stories.where('userID', '==', currentUserId).get()
            setStoryCount(data.size)
        }

        getStoryCount()
        getStories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stories])

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>
        </Card>
            
        <div className='w-100 text-center mt-2'>
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Write your story</h2>       
                <strong>Current Stories:</strong> {storyCount}
                <Link to="/add-story" className="btn btn-primary w-100 mt-3">Add Story!</Link>
            </Card.Body>
        </Card>
            


         {
            stories.map((stories) => {
                return (
                    <div key={stories.id}>
                        <h1>{stories.storyTitle}</h1>
                        <p>{stories.storyBody}</p>
                        <Button onClick={() => handleDelete(stories.id)}>Delete</Button>
                        <Button>Update Story</Button>
                    </div>
                )
            })
        }      
        </>
    )
}

export default Dashboard