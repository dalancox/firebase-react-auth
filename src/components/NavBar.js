import React from "react";
import { LinkContainer } from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavBar() {

    return (
         <Navbar className="sticky-top" bg="light" variant="light">
            <Container>
                <Navbar.Brand>StoryBooks</Navbar.Brand>
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/add-story">
                        <Nav.Link>Add Story</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/explore">
                        <Nav.Link>Explore</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar