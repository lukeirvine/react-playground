import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import $ from 'jquery';

// This matches dd:dd am/pm with or without the colon and space. 
// It also matches any partiality of that string
const timeMatch = /^(?:(0?\d|1[0-2])|$):?((?:[0-5]|$)(?:\d|$)) ?((?:a|$)(?:m|$)|(?:p|$)(?:m|$))$/gi
// this regex converts the display formatting to the simpler internal formatting.
// It has lose rules because the display formatting is strictly enforced already
const internalMatch = /^(\d*):(\d*) *(\w*)$/gi
// this regex determines if the display value is a finished time
// Used for sending out state or not
const finishedMatch = /^(\d\d):(\d\d) ([AP]M)$/g
/* used as a placeholder of sorts. This will get typed over gradually rather than disappear as soon
   as typing commences */
const MASK = '00:00 AM';
const USE_MASK = false;

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

const mergeMask = str => {
    let newStr = str + MASK.substring(str.length)
    return newStr;
}

const chopMask = str => {
    console.log("chop", MASK.substring(str.length))
    return MASK.substring(str.length)
}

const setCaretPosition = (caretPos) => {
    var elem = document.getElementById('time-picker-input');

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

const TimePickerV3 = props => {
    const { required, className, value, onChange, testid } = props;
    const [state, setState] = useState({
        // internal value of format 1200am etc
        str: toInternal(toNormalTime(value))
    })
    const [display, setDisplay] = useState({
        noMask: toNormalTime(value),
        withMask: '',
        mask: chopMask(toNormalTime(value))
    })
    
    // on load
    useEffect(() => {
        setCaretPosition(display.noMask.length)
        document.getElementById('time-picker-input').addEventListener('focus', () => {
            console.log('focusing');
            // sleep(10).then(() => setCaretPosition(display.noMask.length))
            setCaretPosition(3)
        })
        $('#time-picker-input').bind('keydown click focus', () => console.log('caret moved'))
    }, [])

    // Triggers every time the external value is changed externally
    useEffect(() => {
        setState(prev => ({...prev, str: toInternal(toNormalTime(value))}));
        changeDisplay(toNormalTime(value))
    }, [value])

    // Fires every time input is edited
    const handleChange = event => {
        // console.log('event', event.target.value)
        let chopped = event.target.value.substring(0, event.target.value.length - display.mask.length)
        let internalStr = toInternal(USE_MASK ? chopped : event.target.value);
        // console.log('new internal', internalStr)
        if (event.target.value.length > display.noMask.length) {
            // typing forward
            if (timeMatch.test(internalStr) || internalStr === '') {
                setState(prevState => ({...prevState, str: internalStr}))
            }
        } else {
            // back spacing
            let newStr = event.target.value;
            let backMatch = /^(\d\d:\d\d) (a|p)$/gi
            if (backMatch.test(newStr)) {
                newStr = newStr.replace(backMatch, '$1');
            }
            // console.log('return str', newStr)
            // console.log("-----------------------------")
            changeDisplay(newStr);
        }
    }

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
                changeDisplay(newStr);
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
                changeDisplay(newStr);
            }
        }
    }, [state.str])

    const changeDisplay = str => {
        setDisplay({
            noMask: str,
            withMask: mergeMask(str),
            mask: chopMask(str)
        })
    }

    // Triggers every time display value is changed
    useEffect(() => {
        if (finishedMatch.test(display.noMask)) {
            // display is a complete time
            // Send state out of component. Final step.
            onChange(toMilitaryTime(display.noMask))
        }
        // move caret position to always after the actual display
        setCaretPosition(display.noMask.length)
    }, [display.noMask])

    return (
        <>
            <Form.Group>
                <Form.Control
                    id='time-picker-input'
                    required={required}
                    className={className}
                    data-testid={testid}
                    value={USE_MASK ? display.noMask + display.mask : display.noMask}
                    onChange={handleChange}
                    type="text"
                    placeholder="00:00 AM"
                    style={{fontFamily: 'monospace'}}
                />
                <Button onClick={() => setCaretPosition(3)}>Set Cursor</Button>
            </Form.Group>
        </>
    )
}

export default TimePickerV3;