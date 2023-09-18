import React from 'react';
import Star from './Star';
import { createArray } from './lib';

export default function StarRating({ totalStars = 5, selectedStars = 0 }) {
    return (
        <>
            {createArray(totalStars).map((n, i) => (
                <Star key={i} selected={selectedStars > i} />
            ))}
        </>
    );
}
