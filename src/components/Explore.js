import React, { useEffect, useState } from "react";
import { database } from "../firebase";

import PublicStories from "./PublicStories";
import Layout from "./Layout";

function Explore() {
    const [publicStories, setPublicStories] = useState([]);
    useEffect(() => {
        const getPublicStories = async () => {
            const data = await database.stories.where('status', '==', 'Public').get()
            setPublicStories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getPublicStories()
    }, [])

    return (
        <>
        <Layout>
            <div className="d-flex flex-wrap" style={{gap: '1rem'}}>
                {
                    publicStories.map((stories) => {
                        return (
                            <div key={stories.id} style={{width: '300px'}}>
                                <PublicStories stories={stories} />
                            </div>
                        )
                    })
                }
            </div>
        </Layout>   
        </>
    )
}

export default Explore