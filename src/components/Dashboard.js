import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";

import SideBar from "./SideBar";
import PrivateStories from "./PrivateStories";
import Layout from "./Layout";

import styles from "./styles/Dashboard.module.css"


function Dashboard() {
    const [success, setSuccess] = useState(false)
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(false)
    const { getUserStories, deleteUserStories } = useAuth()

    const handleClose = () => {setSuccess(false)}

    const handleStories = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getUserStories()
            setStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        } catch (error) {
            console.log("error")
        }
    }, [getUserStories])

    const handleDelete = async (docId) => {
        setSuccess(true)
        try {
            await deleteUserStories(docId)
            handleStories()
        } catch {
            console.log('error')
        }
    }

    useEffect(() => {
        handleStories()
    }, [handleStories])


    return (
        <>
        <Layout>
        <div className={styles.wrapper}>
            <div className={styles.stories}>
            <Modal show={success} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Succesfully deleted story.</Modal.Title>
                </Modal.Header>
            </Modal>
            <Spinner className={loading ? "d-block":"d-none"} animation="grow" />
                {
                    stories.map((stories) => {
                        return (
                            <div key={stories.id} style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>                     
                                <PrivateStories stories={stories} />
                                <Button onClick={() => handleDelete(stories.id)}>Delete</Button>
                                <Link to={`story/edit/${stories.id}`}>Update</Link>
                            </div>
                        )
                    })
                }
            </div>
            <SideBar story={stories.length} />
        </div>
        </Layout>      
        </>
    )
}

export default Dashboard