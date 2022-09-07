import React, { useEffect, useState } from "react";
import { database } from "../firebase";

import Stories from "./Stories";

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
        <h2>Explore Page</h2>
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

export default Explore