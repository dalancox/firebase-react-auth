import React, {useEffect, useState, useCallback} from "react";
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'
import { Card, Alert, Button } from "react-bootstrap";

import styles from "./styles/SideBar.module.css"


function SideBar({ story }) {
    const { logout, getProfileData } = useAuth()
    const [userData, setUserData] = useState([])
    const [error, setError] = useState('')

    async function handleLogout() {
        setError('')
        try {
            await logout()
        } catch {
            setError('Failed to log out')
        }
    }

    const handleProfileData = useCallback(async () => {
        try {
            const data = await getProfileData()
            setUserData(data.data()) 
        } catch {
            console.log('error')
        }
    }, [getProfileData])

    useEffect(() => {
        handleProfileData()
        
    }, [handleProfileData])

    return (
        <div className={styles.sidebar}>
            <div>
                <Card style={{border: 'none'}}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Profile</h2>
                        <strong>Hello, {userData.firstName} {userData.lastName}</strong>
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                    </Card.Body>
                </Card>
                <Card style={{border: 'none'}}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Write your story</h2>       
                        <strong>Current Stories:</strong> {story}
                        <Link to="/add-story" className="btn btn-primary w-100 mt-3">Add Story!</Link>
                    </Card.Body>
                </Card>
            </div>

            <div className='w-100 text-center'>
                <Link to='/explore'><Button variant="dark">Explore</Button></Link>
            </div>

            <div className='w-100 text-center mb-5'>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}

export default SideBar