import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { database } from "../firebase";
import { Link } from 'react-router-dom'
import { Card } from "react-bootstrap";


function Profile() {
    const { currentUser } = useAuth()
    const [userData, setUserData] = useState([])

    useEffect(() => {
        async function getProfileData() {
            const data = await database.users.doc(currentUser.uid).get()
            setUserData(data.data()) 
        }
        getProfileData() 
        // eslint-disable-next-line
    },[])

    return (
        <>
        <Card style={{border: 'none'}}>
            <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                <strong>Hello, {userData.firstName} {userData.lastName}</strong>
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>
        </Card>
        </>
    )
}

export default Profile;