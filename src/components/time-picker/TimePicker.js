import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

// This matches dd:dd am/pm with or without the colon and space. 
// It also matches any partiality of that string
const timeMatch = /^(0?\d|1[0-2]):?((?:[0-5]|$)(?:\d|$)) ?((?:a|$)(?:m|$)|(?:p|$)(?:m|$))$/gi
// this regex converts the display formatting to the simpler internal formatting.
// It has lose rules because the display formatting is strictly enforced already
const toInternal = /^(\d*):(\d*) *(\w*)$/gi

const TimePicker = props => {
    const { required, className, value, onChange, testid } = props;
    // internal value of format 1200am etc
    const [str, setStr] = useState('');

    useEffect(() => {
        // convert display formatting to internal formatting
        let valInternal = value.replace(toInternal, '$1$2$3');
        if (str.length > valInternal.length) {
            // handle formatting going forward
            let g3 = str.replace(timeMatch, '$3')
            if (g3.length === 0) {
                // handle formatting until we get to am/pm
                onChange(str.replace(timeMatch, '$1:$2'))
            } else {
                // handle formatting once we are at am/pm
                let newStr = str.replace(timeMatch, '$1:$2 $3').toUpperCase()
                if (g3.length === 1) {
                    newStr += 'M';
                }
                onChange(newStr);
            }
        } else {
            // handle backspace formatting
            onChange(str.replace(timeMatch, '$1$2'))
        }
    }, [str])

    const handleChange = event => {
        let temp = event.target.value;
        let internalStr = temp.replace(toInternal, '$1$2$3')
        if (timeMatch.test(internalStr) || internalStr === '') {
            setStr(internalStr)
        }
    }

    return (
        <>
            <Form.Group>
                <Form.Control
                    required={required}
                    className={className}
                    data-testid={testid}
                    value={value}
                    onChange={handleChange}
                    type="text"
                    placeholder="00:00 AM"
                    style={{fontFamily: 'monospace'}}
                />
            </Form.Group>
        </>
    )
}

export default TimePicker