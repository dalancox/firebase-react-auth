import React, { useEffect, useState } from "react";
import { Card } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { database } from "../firebase";
import { getDoc } from "firebase/firestore"
import Layout from "./Layout";


function SingleStory() {
    const [publicStories, setPublicStories] = useState([]);
    const [show, setShow] = useState(true)
    let params = useParams()

    useEffect(() => {
        const getPublicStories = async () => {
            const dataRef = database.stories.doc(`${params.storyId}`)
            const dataSnap = await getDoc(dataRef)

            if(dataSnap.exists()) {
                setShow(true)
                setPublicStories({ ...dataSnap.data(), id: dataSnap.id })
            } else {
                setShow(false)
            }
        }
        getPublicStories()
    }, [params])

    return (
        <>
        <Layout>
        {
            show && 
            <Card>
            <Card.Body>
                <Card.Title>
                    <h3>{publicStories.username} wrote,</h3>
                </Card.Title>
                <Card.Text>
                    {publicStories.storyBody}
                </Card.Text>
            </Card.Body>
           </Card> 
        }
        {
            !show && 
            <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '100vh'}}>
                <h2>It looks this story doesn't exist or was deleted by the user...</h2>
                <Link to='/'>Go Home</Link>
            </div>
        }
        </Layout>
        </>
    )
}

export default SingleStory