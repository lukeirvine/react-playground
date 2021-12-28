import React, { useState, useEffect } from 'react';
import NavBar from './../../nav-bar/NavBar';
import { TimeInputPolyfill } from '@time-input-polyfill/react'
import TimePickerV1 from '../../time-picker-v1/TimePickerV1';
import TimePickerV2 from '../../time-picker-v2/TimePickerV2';
import TimePickerV3 from '../../time-picker-v3/TimePickerV3';
import { Form } from 'react-bootstrap';
import './TimePickerPage.css';

const DEBUG = true;

const TimePickerPage = () => {
    const [time0, setTime0] = useState('');
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [time3, setTime3] = useState('');

    useEffect(() => {
        console.log("time3", time3)
    }, [time3])

    return (
        <>
            <NavBar />
            <div className="tpp-content">
                <h1>Time Picker</h1>
                <Form className="tpp-form">
                    <Form.Group className="mb-3">
                        <Form.Label>External Library Default</Form.Label>
                        <TimeInputPolyfill
                            value={time0}
                            setValue={event => setTime0(event)}
                            className="default-time-picker"
                            role="textbox"
                        />
                        <Form.Text>
                            Not bad, but you have to tab through hours and minutes and can't just type straight through. 
                            A plus though is that it allows mobile devices to use their own default system time pickers. Sorta.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>My version 1</Form.Label>
                        <TimePickerV1
                            value={time1}
                            onChange={event => setTime1(event)}
                            className="tpp-timepicker"
                        />
                        <Form.Text>
                            This version works great typing forward, except you can't see the format template as you type. 
                            Also, backspacing doesn't work so well.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>My version 2</Form.Label>
                        <TimePickerV2
                            value={time2}
                            onChange={event => setTime2(event)}
                            className="tpp-timepicker"
                        />
                        <Form.Text>
                            The backspacing works great on this version, and you can backspace to any point, start typing forward 
                            again, and it will all work as expected. It still doesn't show you the template as you type though.
                        </Form.Text>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>My Version 3</Form.Label>
                        <TimePickerV3
                            value={time3}
                            onChange={event => setTime3(event)}
                            className="tpp-timepicker"
                        />
                    </Form.Group> */}
                </Form>
            </div>
        </>
    )
}

export default TimePickerPage