import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import NavBar from '../../nav-bar/NavBar';
import { Redirect } from 'react-router-dom';

const InnerForm = () => {
    // state vars
    // used to display loading spinner in done button
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState({
        done: false,
        path: ''
    });
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState({
        email: '',
        mailingList: false,
        pw1: '',
        pw2: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        pw1: '',
        pw2: ''
    })

    const validate = (prop, criteria, errorMessage) => {
        const message = criteria() ? '' : errorMessage;
        document.getElementById(prop).setCustomValidity(message);
        setErrors({...errors, [prop]: message});
        return criteria();
    }

    const multiValidate = (params) => {
        if (!Array.isArray(params)) {
            console.error("multiValidate() Must be passsed an array of parameter objects")
        }
        let newErrors = {};
        params.forEach(param => {
            const message = param.criteria() ? '' : param.errorMessage;
            document.getElementById(param.prop).setCustomValidity(message);
            newErrors[param.prop] = message;
        })
        setErrors({...errors, ...newErrors});
    }

    const validateFuncs = {
        email: val => validate(
            'email',
            () => /.+@.+\..+/.test(val),
            'Please enter a valid email'
        ),
        pw1: val => multiValidate([
            {
                prop: 'pw1',
                criteria: () => 12 <= val.length && val.length <= 30,
                errorMessage: 'Please enter a valid password.'
            },
            {
                prop: 'pw2',
                criteria: () => val === state.pw2,
                errorMessage: 'Passwords do not match.'
            }
        ]),
        pw2: val => validate(
            'pw2',
            () => val === state.pw1,
            'Passwords do not match'
        )
    }

    const handleTextChange = prop => {
        return event => {
            let val = event.target.value
            validateFuncs[prop](val);
            setState({...state, [prop]: val})
        }
    }

    const handleCheckChange = prop => {
        setState({...state, [prop]: !state[prop]})
    }


    const handleSubmit = event => {
        event.preventDefault();
        var form = event.currentTarget;
        const valid = form.checkValidity();
        console.log('valid', valid)
        if (!valid) {
            multiValidate([
                {
                    prop: 'email',
                    criteria: () => /.+@.+\..+/.test(state.email),
                    errorMessage: 'Please enter a valid email'
                },
                {
                    prop: 'pw1',
                    criteria: () => 12 <= state.pw1.length && state.pw1.length <= 30,
                    errorMessage: 'Please enter a valid password.'
                },
                {
                    prop: 'pw2',
                    criteria: () => state.pw1 === state.pw2,
                    errorMessage: 'Passwords do not match.'
                },
                {
                    prop: 'pw2',
                    criteria: () => state.pw2 === state.pw1,
                    errorMessage: 'Passwords do not match'
                }
            ])
            event.stopPropagation();
        } else {
            // triggers spinner in done button
            setLoading(true);
        }
        setValidated(true);
    }

    if (redirect.done) {
        return <Redirect to={redirect.path} />
    }

    return <>
        <Form 
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <Modal.Header closeButton>
                <Modal.Title>Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        id="email"
                        required
                        type="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleTextChange('email')}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                    <Form.Text muted>We will not share your email with anyone.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" checked={state.mailingList} onChange={() => handleCheckChange('mailingList')} label="Add me to your mailing list" />
                    <Form.Text muted>
                        We'll give you a heads up when new updates and features are available. <br/>
                        We won't spam you.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        id="pw1"
                        required
                        type="password"
                        placeholder="Enter password"
                        value={state.pw1}
                        onChange={handleTextChange('pw1')}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.pw1}</Form.Control.Feedback>
                    <Form.Text muted>Password must be 12-30 characters in length.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    {/* <Form.Label>Confirm Password</Form.Label> */}
                    <Form.Control
                        id="pw2"
                        required
                        type="password"
                        placeholder="Re-enter password"
                        value={state.pw2}
                        onChange={handleTextChange('pw2')}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.pw2}</Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="info" 
                    type="submit" 
                    // onClick={handleSubmit}
                >
                    {loading ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : <>Done</>}
                </Button>
            </Modal.Footer>
        </Form>
    </>
}

const FormValidate = () => {

    return <>
        <NavBar />
        <div className="f-page">
            <Modal show={true} centered size='lg'>
                <InnerForm />
            </Modal>
        </div>
    </>
}

export default FormValidate;