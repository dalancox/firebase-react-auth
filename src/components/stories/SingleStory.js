import React, { useEffect, useState } from "react";
import { Card } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { database } from "../../firebase";
import { getDoc } from "firebase/firestore"
import Layout from "../Layout";
import { Navigate } from "react-router-dom";


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

    if (show) {
        return (
            <Layout>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h5>{publicStories.username}</h5>
                            <h2>{publicStories.storyTitle}</h2>
                        </Card.Title>
                        <Card.Text>
                            {publicStories.storyBody}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Layout>
        )
    } else {
        return <Navigate to="*" />
    }
}

export default SingleStory