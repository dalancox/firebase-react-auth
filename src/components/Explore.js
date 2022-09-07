import React, { useEffect, useState } from "react";
import { database } from "../firebase";

import PublicStories from "./PublicStories";

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
                    <div className="d-flex" key={stories.id} >
                        <PublicStories stories={stories} />
                    </div>
                )
            })
            }   
        </>
    )
}

export default Explore