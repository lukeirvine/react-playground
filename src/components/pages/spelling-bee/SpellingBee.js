import React, { useState } from 'react';
import NavBar from './../../nav-bar/NavBar';
import { Form, Button, Spinner } from 'react-bootstrap';
import { words } from './words';
import { capitalize } from './../../../resources/Functions';
import './SpellingBee.css'

const SpellingBee = () => {
    const [letters, setLetters] = useState('');
    const [primeLetter, setPrimeLetter] = useState('');
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const changeLetters = e => {
        let str = e.target.value;
        let regex = /^[a-zA-Z]*$/gm;
        if (regex.test(str)) {
            setLetters(str.toUpperCase());
        }
    }

    const changePrime = e => {
        let str = e.target.value;
        let regex = /^[a-zA-Z]{0,1}$/gm;
        if (regex.test(str)) {
            setPrimeLetter(str.toUpperCase());
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        setResults([])
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            setLoading(true)
            let resultStr = '';
            let gLetters = letters + primeLetter;
            gLetters = gLetters.toLowerCase();
            let pL = primeLetter.toLowerCase();
            words.forEach(word => {
                if (!word.includes(pL)) {
                    return;
                }
                let valid = true;
                for (let i = 0; i < word.length; i++) {
                    if (!gLetters.includes(word.charAt(i))) {
                        valid = false;
                        break;
                    }
                }
                if (valid && word.length > 3) {
                    resultStr += word + ", "
                    setResults(prev => [
                        ...prev,
                        word
                    ])
                }
            })
            setLoading(false);
        }
        setValidated(true);
    }

    return <>
        <NavBar />
        <div className="sb-page">
            <div className="sb-content">
                <h2>Spelling Bee Solver</h2>
                <p>
                    Solver for the Spelling Bee game at <a target="_blank" href="https://www.nytimes.com/puzzles/spelling-bee?campaignId=4YLLF&ds_c=71700000067180308&gclid=CjwKCAjw8sCRBhA6EiwA6_IF4fbcLiqpsh7OXjFeKNJUETpF2X-q2y5q-_TEYE7Jdk09cD7hqvz9IBoCEzsQAvD_BwE&gclsrc=aw.ds">The New York Times</a>
                </p>
                <Form
                    className="sb-form"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Gray Letters</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ABCD etc"
                            value={letters}
                            onChange={changeLetters}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Please fill out this field</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            The letters on the outside of the honeycomb
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Prime Letter</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="B etc"
                            value={primeLetter}
                            onChange={changePrime}
                            required
                        />
                        <Form.Control.Feedback type='invalid'>Please fill out this field</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            The middle letter in the honeycomb
                        </Form.Text>
                    </Form.Group>
                    <Button
                        className="auth-submit-btn"
                        variant="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : <>Submit</>}
                    </Button>
                </Form>
                <h2>Results</h2>
                <div>
                    {results.map(word => (
                        <span>{word}, </span>
                    ))}
                </div>
            </div>
        </div>
    </> 
}

export default SpellingBee;