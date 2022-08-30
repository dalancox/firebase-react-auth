import React from "react";
import { Link } from 'react-router-dom'
import { Card } from "react-bootstrap";


function Profile({profileData}) {

    return (
        <>
        <Card style={{border: 'none'}}>
            <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                <strong>Hello, {profileData.firstName} {profileData.lastName}</strong>
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>
        </Card>
        </>
    )
}

export default Profile;