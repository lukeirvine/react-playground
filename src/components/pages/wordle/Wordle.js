import React, { useEffect, useState } from 'react';
import NavBar from './../../nav-bar/NavBar';
import { Button } from 'react-bootstrap';
import { capitalize } from '../../../resources/Functions';
import './Wordle.css';

const tileColors = {
    0: 'rgb(58, 58, 60)',
    1: 'rgb(181, 159, 58)',
    2: 'rgb(83, 141, 78)',
}

const Wordle = () => {
    const [grid, setGrid] = useState({
        letters: {
            0: {0: '', 1: '', 2: '', 3: '', 4: ''},
            1: {0: '', 1: '', 2: '', 3: '', 4: ''},
            2: {0: '', 1: '', 2: '', 3: '', 4: ''},
            3: {0: '', 1: '', 2: '', 3: '', 4: ''},
            4: {0: '', 1: '', 2: '', 3: '', 4: ''},
            5: {0: '', 1: '', 2: '', 3: '', 4: ''}
        },
        colors: {
            0: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
            1: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
            2: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
            3: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
            4: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
            5: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}
        },
        index: {
            i: 0,
            j: 0
        }
    })
    const [valid, setValid] = useState(false);
    const [sets, setSets] = useState({
        0: '',
        1: '',
        2: ''
    })

    const handleNewLetter = e => {
        return prev => {
            if (prev.index.i === 6 && prev.index.j === 0) {
                return prev;
            }
            return {
                ...prev,
                letters: {
                    ...prev.letters,
                    [prev.index.i]: {
                        ...prev.letters[prev.index.i],
                        [prev.index.j]: capitalize(e.key)
                    }
                },
                index: prev.index.j === 4 ? {
                    i: prev.index.i + 1,
                    j: 0
                } : {
                    ...prev.index,
                    j: prev.index.j + 1
                }
            }
        }
    }

    const handleBackSpace = prev => {
        let i0 = prev.index.j === 0 ? prev.index.i - 1 : prev.index.i;
        let j0 = prev.index.j === 0 ? 4 : prev.index.j - 1;
        if (prev.index.i === 0 && prev.index.j === 0) {
            return prev;
        }
        return {
            ...prev,
            letters: {
                ...prev.letters,
                [i0]: {
                    ...prev.letters[i0],
                    [j0]: ''
                }
            },
            index: prev.index.j === 0 ? {
                i: prev.index.i - 1,
                j: 4
            } : {
                ...prev.index,
                j: prev.index.j - 1
            }
        }
    }

    const handleKeyDown = e => {
        // key pressed is a letter
        if (65 <= e.which && e.which <= 90) {
            setGrid(handleNewLetter(e))
        }
        // backspace
        if (e.which === 8) {
            setGrid(handleBackSpace)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        if (grid.index.j === 0 && grid.index.i !== 0) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [grid.index])

    const handleTileClick = (i, j) => {
        return () => {
            if (i <= grid.index.i) {
                setGrid(prev => ({
                    ...prev,
                    colors: {
                        ...prev.colors,
                        [i]: {
                            ...prev.colors[i],
                            [j]: (prev.colors[i][j] + 1) % 3
                        }
                    }
                }))
            }
        }
    }

    const handleSubmit = () => {
        let tempSets = {
            0: '',
            1: '', 
            2: ''
        }
        for (let i = 0; i < grid.index.i; i++) {
            for (let j = 0; j < 5; j++) {
                if (!tempSets[grid.colors[i][j]].includes(grid.letters[i][j])) {
                    tempSets[grid.colors[i][j]] += grid.letters[i][j]
                }
            }
        }
        setSets(tempSets);
    }

    useEffect(() => {
        console.log(sets)
    }, [sets])

    return <>
        <NavBar />
        <div className="w-page">
            <div className="w-content">
                <h1 className="w-title">Wordle Solver</h1>
                <div className="w-grid">
                    {Object.values(grid.letters).map((row, i) => (
                        <>{Object.values(row).map((tile, j) => (
                            <div 
                                className="w-tile"
                                style={{
                                    backgroundColor: grid.letters[i][j] === '' ? 'white' : tileColors[grid.colors[i][j]],
                                    cursor: i <= grid.index.i ? 'pointer' : ''
                                }}
                                onClick={handleTileClick(i, j)}
                            >
                                <div 
                                    className="w-tile-letter"
                                >{tile}</div>
                            </div>
                        ))}</>
                    ))}
                </div>
                <Button 
                    onClick={handleSubmit}
                    disabled={!valid}
                >Enter</Button>
            </div>
        </div>
    </>
}

export default Wordle;