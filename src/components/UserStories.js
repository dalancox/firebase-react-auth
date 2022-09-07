import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { Link } from 'react-router-dom'

import PublicStories from "./PublicStories";


function UserStories() {
    const [publicStories, setPublicStories] = useState([]);

    let params = useParams()


    useEffect(() => {
        const getPublicStories = async () => {
            const data = await database.stories.where('userID', '==', params.userId).where('status', '==', 'Public').get()
            setPublicStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getPublicStories()
    }, [params])

    return (
        <>
        {
            publicStories.length === 0 && 
            <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '100vh'}}>
                <h2>It looks this user doesn't have any stories or doesn't exist...</h2>
                <Link to='/'>Go Home</Link>
            </div>
        }
            {
            publicStories.map((stories) => {
                return (
                    <div key={stories.id} style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>
                        <PublicStories stories={stories} />
                    </div>
                )
            })
            }   
        </>
    )
}

export default UserStories