import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";

import PublicStories from "./PublicStories";
import Layout from "./Layout";


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
        <Layout>
            {
            publicStories.map((stories) => {
                return (
                    <div key={stories.id} style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>
                        <PublicStories stories={stories} />
                    </div>
                )
            })
            }   
        </Layout>
        </>
    )
}

export default UserStories