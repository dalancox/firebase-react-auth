import React from 'react'
import { Link } from 'react-router-dom'

import Layout from './Layout'

function PageNotFound() {
    return (
        <Layout>
            <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
                <div className='d-flex flex-column align-items-center'>
                    <h1>Uh oh!</h1>
                    <h3>This page could not be found</h3>
                    <Link to="/">Go Home</Link>
                </div>
            </div>
        </Layout>
    )
}

export default PageNotFound