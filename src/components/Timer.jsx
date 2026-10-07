import './Timer.css'
import { useEffect, useState } from 'react'

export default function Timer({ isRunning }) {
    const [seconds, setSeconds] = useState(600);

    useEffect(() => {
        if (isRunning) {
            setSeconds(600);
        }
    }, [isRunning])

    useEffect(() => {
        if (!isRunning || seconds <= 0) {
            return;
        }

        const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(id);
    }, [isRunning, seconds])

    return (
        <div className='timer'>
            {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
        </div>
    )
}