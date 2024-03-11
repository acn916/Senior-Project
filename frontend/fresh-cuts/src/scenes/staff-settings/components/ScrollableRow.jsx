import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

const ScrollableRow = ({ items, onItemClick, ...props }) => {
    const containerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false); // Default to false

    const checkScrollButtons = () => {
        const container = containerRef.current;
        if (container) {
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < maxScrollLeft);
        }
    };

    // Effect for initial and on-demand checks
    useEffect(() => {
        checkScrollButtons(); // Perform initial check
        // Adding a resize observer to handle window or container resize events
        const resizeObserver = new ResizeObserver(checkScrollButtons);
        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [items]); // Dependency on items; adjust as necessary based on your use case

    const scroll = (scrollOffset) => {
        containerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    };

    return (
        <Box display="flex" alignItems="center" {...props}>
            <Box
                ref={containerRef}
                display="flex"
                overflow="hidden"
                whiteSpace="nowrap"
                onScroll={checkScrollButtons}
            >
                {items.map((item, index) => (
                    <Button
                        key={index}
                        sx={{ margin: '0 8px', flexShrink: 0 }}
                        onClick={() => onItemClick(item)}
                    >
                        {item}
                    </Button>
                ))}
            </Box>
            <IconButton
                onClick={() => scroll(-200)}
                aria-label="scroll left"
                disabled={!canScrollLeft}
            >
                <ArrowBack />
            </IconButton>
            <IconButton
                onClick={() => scroll(200)}
                aria-label="scroll right"
                disabled={!canScrollRight}
            >
                <ArrowForward />
            </IconButton>
        </Box>
    );
};

export default ScrollableRow;
