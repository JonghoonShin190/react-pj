import * as React from 'react';
import Typography from '@mui/material/Typography';
import Rating from './Rating';


function RatingItem({ title, rating }) {
  return (
    <div style={{ display:'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '50%', textAlign: 'right', marginRight: '10px' }}>
        <Typography variant="h6" component="div" sx={{ fontSize:'15px', fontWeight:'bold'}}>
          {title}
        </Typography>
      </div>
      <Rating value={rating} />
      <Typography variant="h6" component="div" sx={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '10px' }}>
        {rating.toFixed(1)} {/*별 소수점 첫째자리*/}
      </Typography>
    </div>
  );
}

function AverageStringBar({ rating }) {
  return (
    <div style={{ display: 'flex', flexDirection:'column' }}>
      {/* Use the new component */}
      <RatingItem title="강의력" rating={rating} />
      <RatingItem title="커리큘럼" rating={rating} />
      <RatingItem title="서비스" rating={rating} />
      <RatingItem title="편의성" rating={rating} />
      <RatingItem title="가성비" rating={rating} /> 
    </div>  
  );
}

export default AverageStringBar;
