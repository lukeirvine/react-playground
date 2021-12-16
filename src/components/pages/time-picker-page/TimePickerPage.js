import React, { useState } from 'react';
import NavBar from './../../nav-bar/NavBar';
import TimePicker from '../../time-picker-v2/TimePickerV2';
import { Form } from 'react-bootstrap';
import './TimePickerPage.css';

const TimePickerPage = () => {
    const [time, setTime] = useState('')

    return (
        <>
            <NavBar />
            <div className="tpp-content">
                <h1>Time Picker</h1>
                <Form className="tpp-form">
                    <Form.Group>
                        <TimePicker
                            value={time}
                            onChange={event => setTime(event)}
                            className="tpp-timepicker"
                        />
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default TimePickerPage