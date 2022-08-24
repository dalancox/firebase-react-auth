import React, { useState } from "react";
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../firebase'


function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    let navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

        database.stories.doc('JwHJl035SHW0pOjkvxzT').get().then(doc => {
        const formattedDoc = {
            id: doc.id,
            ...doc.data(),
        }
        console.log(formattedDoc)
        }).catch(() =>{
            console.log('error')
        })
        
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
                    
                    <strong>Current Stories:</strong>
                    <Link to="/add-story" className="btn btn-primary w-100 mt-3">Add Story!</Link>
                </Card.Body>
            </Card>
            <div>
                {
                
                }
            </div>

        </>
    )
}

export default Dashboard