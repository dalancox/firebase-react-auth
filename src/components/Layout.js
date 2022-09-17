import React from "react";

import NavBar from "./NavBar";

function Layout({ children }) {
    return (
        <>
        <NavBar />
        <main className="m-3">
            {children}
        </main>
        </>
    )
}

export default Layout