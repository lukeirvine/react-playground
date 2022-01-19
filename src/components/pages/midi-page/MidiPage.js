import React, { useEffect, useState } from 'react';
import NavBar from '../../nav-bar/NavBar';
import './MidiPage.css';
import { Button } from 'react-bootstrap';

const MidiPage = () => {
    const [devices, setDevices] = useState({})
    const [notes, setNotes] = useState([])

    const toNote = n => {
        let base = n % 12;
        switch (base) {
            case 0:
                return 'C';
            case 1:
                return 'Db';
            case 2:
                return 'D';
            case 3:
                return 'Eb';
            case 4:
                return 'E';
            case 5:
                return 'F';
            case 6:
                return 'Gb';
            case 7:
                return 'G';
            case 8:
                return 'Ab';
            case 9:
                return 'A';
            case 10:
                return 'Bb';
            case 11:
                return 'B';
            default:
                return '';
        }
    }

    const connectToDevice = (device) => {
        console.log('Connecting to device', device);
        device.onmidimessage = m => {
            const [command, key] = m.data;
            if (command === 128) {
                setNotes(prev => {
                    let newarr = JSON.parse(JSON.stringify(prev));
                    newarr.splice(prev.indexOf(key), 1)
                    return newarr;
                })
            } else if(command === 144) {
                setNotes(prev => [...prev, key].sort((a, b) => a - b))
            }
        }
    }

    useEffect(() => {
        const updateDevices = inputs => {
            let dObj = {};
            inputs.forEach(input => {
                dObj[input.id] = input;
            })
            setDevices(dObj);
        }

        try {
            navigator.requestMIDIAccess().then(access => {
                console.log('access', access);
                updateDevices(Array.from(access.inputs.values()));
                access.onstatechange = e => {
                    updateDevices(Array.from(access.inputs.values()));
                }
            })
        } catch (error) {
            console.error(error)
            alert('Midi is only supported by Chrome, Edge, and Opera')
        }
    }, [])

    return (
        <>
            <NavBar />
            <div className="midi-page">
                <div className='mp-content'>
                    <h1 className='mp-title'>Midi Reader</h1>
                    <p>Click a device to open its connection.</p>
                    {Object.values(devices).map((device, i) => {
                        return (
                            <div className='mp-device-btn-wrapper'>
                                <Button 
                                    key={i} 
                                    className='mp-device-btn'
                                    onClick={() => connectToDevice(device)}
                                    variant={device.connection === 'open' ? 'success' : 'danger'}
                                >{device.name} ({device.manufacturer})</Button>
                            </div>
                        )
                    })}
                    <span>Notes: </span>
                    {notes.map((key, i) => {
                        return <span key={i}>{toNote(key)}{i === notes.length - 1 ? '' : ' - '}</span>
                    })}
                </div>
            </div>
        </>
    )
}

export default MidiPage;