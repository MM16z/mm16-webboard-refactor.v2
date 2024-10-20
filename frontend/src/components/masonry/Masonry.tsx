'use client'
import "@/styles/post-box/post-box.css";
import "@/styles/post-box/comment-box.css";

import React from 'react'

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 4,
    1920: 3,
    1500: 2,
    1100: 1,
};

interface MasonryComponentProps {
    children: React.ReactNode;
}

export default function MasonryComponent({ children }: MasonryComponentProps) {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            style={{ marginTop: "20px" }}
        >
            {children}
        </Masonry>
    )
}
