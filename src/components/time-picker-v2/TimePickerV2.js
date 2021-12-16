import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

// This matches dd:dd am/pm with or without the colon and space. 
// It also matches any partiality of that string
const timeMatch = /^(?:(0?\d|1[0-2])|$):?((?:[0-5]|$)(?:\d|$)) ?((?:a|$)(?:m|$)|(?:p|$)(?:m|$))$/gi
// this regex converts the display formatting to the simpler internal formatting.
// It has lose rules because the display formatting is strictly enforced already
const internalMatch = /^(\d*):(\d*) *(\w*)$/gi
// this regex determines if the display value is a finished time
// Used for sending out state or not
const finishedMatch = /^(\d\d):(\d\d) ([AP]M)$/g

// str is of format 12:30 AM etc
const toMilitaryTime = str => {
    let hours = parseInt(str.replace(finishedMatch, '$1'));
    let minutes = str.replace(finishedMatch, '$2');
    let dayHalf = str.replace(finishedMatch, '$3');
    if (dayHalf === 'AM') {
        hours = hours === 12 ? 0 : hours;
    } else {
        // PM
        hours = hours !== 12 ? hours + 12 : hours;
    }
    hours = hours.toString();
    hours = hours.length === 1 ? '0' + hours : hours;
    return hours + ':' + minutes;
}

// str is of format 13:30 etc (military time)
const toNormalTime = str => {
    let militaryMatch = /^([01]\d|2[0-3]):([0-5]\d)$/g;
    if (militaryMatch.test(str)) {
        let hours = parseInt(str.replace(militaryMatch, '$1'));
        let minutes = str.replace(militaryMatch, '$2');
        let dayHalf = '';
        if (hours < 12) {
            dayHalf = 'AM';
            hours = hours === 0 ? '12' : hours;
        } else {
            dayHalf = 'PM';
            hours = hours > 12 ? hours - 12 : hours;
        }
        hours = hours.toString();
        hours = hours.length === 1 ? '0' + hours : hours;
        return hours + ':' + minutes + ' ' + dayHalf;
    } else {
        return '';
    }
}

const toInternal = str => {
    let newStr = str.replace(internalMatch, '$1$2$3');
    if (newStr.charAt(0) === '0') {
        newStr = newStr.substring(1);
    }
    return newStr;
}

const TimePickerV2 = props => {
    const { required, className, value, onChange, testid } = props;
    // internal value of format 1200am etc
    const [state, setState] = useState({
        str: toInternal(toNormalTime(value)),
        mask: '00:00 AM'
    })
    const [display, setDisplay] = useState(toNormalTime(value))

    useEffect(() => {
        setState(prev => ({...prev, str: toInternal(toNormalTime(value))}));
        setDisplay(toNormalTime(value));
    }, [value])

    // Triggers every time display value is changed
    useEffect(() => {
        if (finishedMatch.test(display)) {
            // display is a complete time
            // Send state out of component. Final step.
            onChange(toMilitaryTime(display))
        }
    }, [display])

    // Triggers every time internal value is changed
    useEffect(() => {
        // convert display formatting to internal formatting
        // let valInternal = toInternal(value);
        // // console.log('old value to internal', valInternal);
        // handle formatting going forward
        let g1 = state.str.replace(timeMatch, '$1');
        let g3 = state.str.replace(timeMatch, '$3');
        if (state.str.length !== 0) {
            if (g3.length === 0) {
                // handle formatting until we get to am/pm
                let newStr = state.str.replace(timeMatch, '$1:$2')
                if (g1.length === 1) {
                    newStr = '0' + newStr;
                }
                // console.log('return str', newStr)
                // console.log("-----------------------------")
                setDisplay(newStr)
            } else {
                // handle formatting once we are at am/pm
                let newStr = state.str.replace(timeMatch, '$1:$2 $3').toUpperCase()
                if (g3.length === 1) {
                    newStr += 'M';
                }
                if (g1.length === 1) {
                    newStr = '0' + newStr;
                }
                // console.log('return str', newStr)
                // console.log("-----------------------------")
                setDisplay(newStr);
            }
        }
    }, [state.str])

    const handleChange = event => {
        // console.log('event', event.target.value)
        let internalStr = toInternal(event.target.value);
        // console.log('new internal', internalStr)
        if (event.target.value.length > display.length) {
            if (timeMatch.test(internalStr) || internalStr === '') {
                setState(prevState => ({...prevState, str: internalStr}))
            }
        } else {
            let newStr = event.target.value;
            let backMatch = /^(\d\d:\d\d) (a|p)$/gi
            if (backMatch.test(newStr)) {
                newStr = newStr.replace(backMatch, '$1');
            }
            // console.log('return str', newStr)
            // console.log("-----------------------------")
            setDisplay(newStr);
        }
    }

    return (
        <>
            <Form.Group>
                <Form.Control
                    required={required}
                    className={className}
                    data-testid={testid}
                    value={display}
                    onChange={handleChange}
                    type="text"
                    placeholder="00:00 AM"
                    style={{fontFamily: 'monospace'}}
                />
            </Form.Group>
        </>
    )
}

export default TimePickerV2
