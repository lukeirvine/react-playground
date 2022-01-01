import React, { useState } from 'react';
import NavBar from '../../nav-bar/NavBar';
import TimePickerV2 from '../../time-picker-v2/TimePickerV2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form } from 'react-bootstrap';
import { copyStringToClipboard, toMili } from '../../../resources/Functions';
import './GetMili.css';

const GetMili = () => {
    const [time, setTime] = useState('')
    const [date, setDate] = useState(new Date().getTime())

    const handleSubmit = e => {
        e.preventDefault();
        let dateObj = new Date(date)
        let justDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0)
        let timeMili = toMili(time);
        
        let finalMili = justDate.getTime() + timeMili;
        copyStringToClipboard(finalMili);
        alert(finalMili.toString() + ' copied to clipboard')
    }

    return (
        <>
            <NavBar />
            <div className='gm-page'>
                <div className='gm-content'>
                    <h1 className='gm-title'>Generate Miliseconds</h1>
                    <Form onSubmit={handleSubmit}>
                        <DatePicker
                            title="goal-date-picker"
                            selected={new Date(date)}
                            onChange={e => setDate(e.getTime())}
                            className="gm-date-picker"
                            data-testid="gm-date-picker"
                        />
                        <TimePickerV2
                            value={time}
                            onChange={event => setTime(event)}
                            className="gm-timepicker"
                        />
                        <div className="gm-btn-wrapper">
                            <Button onClick={handleSubmit} type='submit'>Copy to Clipboard</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default GetMili;