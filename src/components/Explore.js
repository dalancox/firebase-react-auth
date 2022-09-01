import React, { useEffect, useState } from "react";
import { database } from "../firebase";


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
            {
            publicStories.map((stories) => {
                return (
                    <div key={stories.id} style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>
                        <p>{stories.username}</p>
                        <h1>{stories.storyTitle}</h1>
                        <p>{stories.storyBody}</p>
                    </div>
                )
                })
            }
        </>
     )
}

export default Explore