import React, { useEffect } from 'react';
import NavBar from '../../nav-bar/NavBar';
// import MIDIVal from '@midival/core';
// import { useMIDI } from '@react-midi/hooks';
import './MidiPage.css';
// const midi = require('midi');

const MidiPage = () => {
    const listEvents = () => {
        const list = document.getElementById('midi-list');
        const debugEl = document.getElementById('debug');

        const connectToDevice = (device) => {
            console.log('Connecting to device', device);
            device.onmidimessage = m => {
                const [command, key, velocity] = m.data;
                if (command === 128) {
                    debugEl.innerText = 'KEY UP';
                } else if(command === 144) {
                    debugEl.innerText = 'KEY DOWN: ' + key + ', ' + velocity;
                }
            }
        }

        const replaceElements = inputs => {
            while(list.firstChild) {
                list.removeChild(list.firstChild)
            }
            const elements = inputs.map(e => {
                console.log(e);
                const el = document.createElement('li')
                el.innerText = `${e.name} (${e.manufacturer})`;
                el.addEventListener('click', connectToDevice.bind(null, e));
                return el;
            });

            elements.forEach(e => list.appendChild(e));
        }

        navigator.requestMIDIAccess().then(access => {
            console.log('access', access);
            replaceElements(Array.from(access.inputs.values()));
            access.onstatechange = e => {
                replaceElements(Array.from(access.inputs.values()));
            }
        })
    }

    useEffect(() => {
        // listDevices();
        listEvents();
        // midiValFunc();
    }, [])

    return (
        <>
            <NavBar />
            <div className="midi-page">
                <div className='mp-content'>
                    <h1 className='mp-title'>Midi Reader</h1>
                    <ul id='midi-list'></ul>
                    <div id='debug'></div>
                </div>
            </div>
        </>
    )
}

export default MidiPage;