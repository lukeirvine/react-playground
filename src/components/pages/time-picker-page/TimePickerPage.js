import React, { useState } from 'react';
import NavBar from './../../nav-bar/NavBar';
import TimePickerV1 from '../../time-picker-v1/TimePickerV1';
import TimePickerV2 from '../../time-picker-v2/TimePickerV2';
import TimePickerV3 from '../../time-picker-v3/TimePickerV3';
import { Form } from 'react-bootstrap';
import './TimePickerPage.css';

const TimePickerPage = () => {
    const [time1, setTime1] = useState('')
    const [time2, setTime2] = useState('')
    const [time3, setTime3] = useState('')

    return (
        <>
            <NavBar />
            <div className="tpp-content">
                <h1>Time Picker</h1>
                <Form className="tpp-form">
                    <Form.Group>
                        <Form.Text>Version 1</Form.Text>
                        <TimePickerV1
                            value={time1}
                            onChange={event => setTime1(event)}
                            className="tpp-timepicker"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Text>Version 2</Form.Text>
                        <TimePickerV2
                            value={time2}
                            onChange={event => setTime2(event)}
                            className="tpp-timepicker"
                        />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Text>Version 3</Form.Text>
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