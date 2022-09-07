import React, {useState, useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext"

import Stories from "./Stories";


function UserStories() {
    const { getProfileData } = useAuth()

    const [publicStories, setPublicStories] = useState([]);
    const [userData, setUserData] = useState([])

    let params = useParams()

    const handleProfileData = useCallback(async () => {
        try {
            const data = await getProfileData()
            setUserData(data.data()) 
        } catch {
            console.log('error')
        }
    }, [getProfileData])

    useEffect(() => {
        const getPublicStories = async () => {
            const data = await database.stories.where('userID', '==', params.userId).where('status', '==', 'Public').get()
            setPublicStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        handleProfileData()
        getPublicStories()
    }, [params, handleProfileData])

    return (
        <>
        <h1 className="d-flex justify-content-center m-5">{userData.firstName}'s Stories</h1>
            {
            publicStories.map((stories) => {
                return (
                    <div key={stories.id} style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>
                        <Stories stories={stories} />
                    </div>
                )
            })
            }   
        </>
    )
}

export default UserStories