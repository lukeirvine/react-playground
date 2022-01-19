import React, { useEffect } from 'react';
import NavBar from '../../nav-bar/NavBar';
import MIDIVal from '@midival/core';
import './MidiPage.css';

const MidiPage = () => {
    useEffect(() => {
        MIDIVal.connect().then(accessObject => {
            console.log('inputs', accessObject.inputs);
            console.log('outputs', accessObject.outputs);
        });
    }, [])

    return (
        <>
            <NavBar />
            <div className="midi-page">
                <div className='mp-content'>
                    <h1 className='mp-title'>Midi Reader</h1>
                </div>
            </div>
        </>
    )
}

export default MidiPage;