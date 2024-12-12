'use client';

import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppSelector } from "@/redux/hook";
import { homepageApiService } from "@/api/homepageService";

interface HeartButtonProps {
    postId: number;
    initialLikeCount: number;
    defaultChecked: boolean;
}
export const HeartButton = ({
    postId,
    initialLikeCount,
    defaultChecked,
}: HeartButtonProps) => {
    const userId = useAppSelector(state => state.userSlice.currentUser.userId);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLiked, setIsLiked] = useState(defaultChecked);
    const { isDebouncing, startDebounce } = useDebounce(500);

    const handleLikeToggle = useCallback(async () => {
        if (isDebouncing || !userId) return;

        const newIsLiked = !isLiked;
        const previousCount = likeCount;

        setIsLiked(newIsLiked);
        setLikeCount(prev => prev + (newIsLiked ? 1 : -1));
        startDebounce();

        try {
            await homepageApiService.updatePostLike(
                postId,
                newIsLiked ? "like" : "unlike"
            );
        } catch (error) {
            setIsLiked(!newIsLiked);
            setLikeCount(previousCount);
            console.error('Failed to update like status:', error);
        }
    }, [isLiked, likeCount, isDebouncing, userId, postId, startDebounce]);

    useEffect(() => {
        setLikeCount(initialLikeCount);
    }, [initialLikeCount]);

    useEffect(() => {
        setIsLiked(defaultChecked);
    }, [defaultChecked]);

    return (
        <div className="heartbtn-warpper">
            <div className="postlikecount">{likeCount}</div>
            <input
                type="checkbox"
                id="checkbox"
                onChange={handleLikeToggle}
                checked={isLiked}
                disabled={!userId || isDebouncing}
                style={{ cursor: !userId ? "help" : isDebouncing ? "wait" : "pointer" }}
            />
            <label htmlFor="checkbox">
                <noscript>By http://robeen.io</noscript>
                <svg
                    style={{ opacity: !userId ? "0.5" : "1" }}
                    id="heart-svg"
                    viewBox="467 392 58 57"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        id="Group"
                        fill="none"
                        fillRule="evenodd"
                        transform="translate(467 392)"
                    >
                        <path
                            d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                            id="heart"
                            fill="#AAB8C2"
                        />
                        <circle
                            id="main-circ"
                            fill="#E2264D"
                            opacity={0}
                            cx="29.5"
                            cy="29.5"
                            r="1.5"
                        />
                        <g id="grp7" opacity={0} transform="translate(7 6)">
                            <circle id="oval1" fill="#9CD8C3" cx={2} cy={6} r={2} />
                            <circle id="oval2" fill="#8CE8C3" cx={5} cy={2} r={2} />
                        </g>
                        <g id="grp6" opacity={0} transform="translate(0 28)">
                            <circle id="oval1" fill="#CC8EF5" cx={2} cy={7} r={2} />
                            <circle id="oval2" fill="#91D2FA" cx={3} cy={2} r={2} />
                        </g>
                        <g id="grp3" opacity={0} transform="translate(52 28)">
                            <circle id="oval2" fill="#9CD8C3" cx={2} cy={7} r={2} />
                            <circle id="oval1" fill="#8CE8C3" cx={4} cy={2} r={2} />
                        </g>
                        <g id="grp2" opacity={0} transform="translate(44 6)">
                            <circle id="oval2" fill="#CC8EF5" cx={5} cy={6} r={2} />
                            <circle id="oval1" fill="#CC8EF5" cx={2} cy={2} r={2} />
                        </g>
                        <g id="grp5" opacity={0} transform="translate(14 50)">
                            <circle id="oval1" fill="#91D2FA" cx={6} cy={5} r={2} />
                            <circle id="oval2" fill="#91D2FA" cx={2} cy={2} r={2} />
                        </g>
                        <g id="grp4" opacity={0} transform="translate(35 50)">
                            <circle id="oval1" fill="#F48EA7" cx={6} cy={5} r={2} />
                            <circle id="oval2" fill="#F48EA7" cx={2} cy={2} r={2} />
                        </g>
                        <g id="grp1" opacity={0} transform="translate(24)">
                            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy={3} r={2} />
                            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy={2} r={2} />
                        </g>
                    </g>
                </svg>
            </label>
        </div>
    );
};