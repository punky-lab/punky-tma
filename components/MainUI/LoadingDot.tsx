import { useEffect, useState } from 'react';

const LoadingDots = () => {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev >= 6 ? 1 : prev + 1));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="nes-container with-title bg-white">
            <p className="title">Punky</p>
            <p>{'.'.repeat(dots)}</p>
        </div>
    );
};

export default LoadingDots;