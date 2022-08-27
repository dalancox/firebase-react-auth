import React from "react";
import { Link } from 'react-router-dom'
import { Card } from "react-bootstrap";


function WriteStory({ story }) {
    return (
        <>
        <Card style={{border: 'none'}}>
            <Card.Body>
                <h2 className='text-center mb-4'>Write your story</h2>       
                <strong>Current Stories:</strong> {story}
                <Link to="/add-story" className="btn btn-primary w-100 mt-3">Add Story!</Link>
            </Card.Body>
        </Card>
        </>
    )
}

export default WriteStory