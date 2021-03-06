import React from 'react';
import './NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand>
                    <Link className="brand-link" to="/"><i className="bi-code-square nav-icon" /> Luke Irvine</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/timepicker">Time Picker</Nav.Link>
                        <Nav.Link as={Link} to="/get-mili">Get Miliseconds</Nav.Link>
                        <Nav.Link as={Link} to="/babylon-page">Babylon</Nav.Link>
                        <Nav.Link as={Link} to="/midi-page">Midi Reader</Nav.Link>
                        <Nav.Link as={Link} to="/form-validate">FormValidate</Nav.Link>
                        <Nav.Link as={Link} to="/spelling-bee">Spelling Bee</Nav.Link>
                        <Nav.Link as={Link} to="/wordle">Wordle Solver</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar
