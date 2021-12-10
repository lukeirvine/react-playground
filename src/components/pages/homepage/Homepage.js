import React from 'react';
import NavBar from './../../nav-bar/NavBar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Homepage.css'

const Homepage = () => {
    return (
        <>
            <NavBar />
            <div className="hp-content">
                <h1>Playground Homepage</h1>
                <div className="hp-item">
                    <h2>TimePicker</h2>
                    <p>This timepicker is a simple form input that does all its work using regular expressions.</p>
                    <Button 
                        variant="primary" 
                        as={ Link }
                        to="/timepicker"
                    >
                        <i className='bi-clock hp-icon' />
                        <span className="homepage-link-btn-text">See the TimePicker</span>
                    </Button>
                </div>

            </div>
        </>
    )
}

export default Homepage;