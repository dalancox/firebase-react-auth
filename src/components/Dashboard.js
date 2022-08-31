import React, { useState, useEffect } from "react";
import { Button, Alert } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../contexts/AuthContext"
import { database } from '../firebase'

import Profile from "./Profile";
import WriteStory from "./WriteStory";

import styles from "./styles/Dashboard.module.css"

function Dashboard() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])
    const { logout, currentUser } = useAuth()

    async function handleLogout() {
        setError('')
        try {
            await logout()
        } catch {
            setError('Failed to log out')
        }
    }

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
            <div className={styles.sidebar}>
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

            <div className={styles.stories}>
                <div>
                    <Profile profileData={userData} />
                    <WriteStory story={stories.length} />
                </div>

                <div className='w-100 text-center mb-5' style={{position: 'absolute', bottom: '0'}}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </div>      
        </>
    )
}

export default Dashboard