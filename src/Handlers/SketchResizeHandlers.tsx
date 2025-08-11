import { useRef, useState, useEffect } from 'react';

// Option 1: Simple hook with ref
export function useElementWidth() {
    const elementRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [show, setShow] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            if (elementRef.current) {
                const newWidth = elementRef.current.clientWidth;
                setWidth(newWidth);
                setHeight(elementRef.current.clientHeight);
                console.log('Element width:', newWidth);
                if(show == false){
                    setShow(true)
                }
            }
        };

        // Get initial size
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { elementRef, width, show, height };
}