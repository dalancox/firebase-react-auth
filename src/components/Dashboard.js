import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../contexts/AuthContext"
import { database } from '../firebase'

import SideBar from "./SideBar";

import styles from "./styles/Dashboard.module.css"

function Dashboard() {
    const [success, setSuccess] = useState(false)
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])
    const { currentUser } = useAuth()

    const handleDelete = async (docId) => {
        setSuccess(true)
        try {
            database.stories.doc(docId).delete()
            const data = await database.stories.where('userID', '==', currentUser.uid).get()
            setStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } catch {
            console.log('error')
        }
    }

    const handleClose = () => {setSuccess(false)}


    useEffect(() => {
        setLoading(true)
        const getStories = async () => {
            const data = await database.stories.where('userID', '==', currentUser.uid).get()
            setStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }

        const getProfileData = async () => {
            const data = await database.users.doc(currentUser.uid).get()
            setUserData(data.data()) 
        }

        getProfileData() 
        getStories()

        return () => {
            getStories()
            getProfileData()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <div className={styles.wrapper}>
            <div className={styles.stories}>
            <Modal show={success} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Succesfully deleted story.</Modal.Title>
                </Modal.Header>
            </Modal>
            <Spinner className={loading ? "d-block":"d-none"} animation="grow" />
                {
                    stories.length === 0 && 
                    <h2>You have no stories...</h2>
                }
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


            <SideBar profileData={userData} story={stories.length} />
            
        </div>      
        </>
    )
}

export default Dashboard