import React from 'react';
import { FaStar } from 'react-icons/fa';

//별 컴포넌트 색상 선택
function Star({ selected = false, onSelect = f => f }) {
    return <FaStar color={selected ? 'blue' : 'grey'} onClick={onSelect} />;
}

export default Star;