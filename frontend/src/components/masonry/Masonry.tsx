'use client'
import "@/styles/post-box/post-box.css";
import "@/styles/post-box/comment-box.css";
import React, { useEffect, useState, useRef } from 'react'
import Masonry from "react-masonry-css";

const getBreakpointColumns = (panelWidth: number) => {
    if (panelWidth >= 1920) return 4;
    if (panelWidth >= 1300) return 3;
    if (panelWidth >= 800) return 2;
    return 1;
};

interface MasonryComponentProps {
    children: React.ReactNode;
    containerRef: React.RefObject<HTMLDivElement>;
}

export default function MasonryComponent({ children, containerRef }: MasonryComponentProps) {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const panelWidth = entry.contentRect.width;
                const newColumns = getBreakpointColumns(panelWidth);
                setColumns(newColumns);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [containerRef]);

    return (
        <div>
            <Masonry
                breakpointCols={columns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                style={{ marginTop: "20px" }}
            >
                {children}
            </Masonry>
        </div>
    );
}
