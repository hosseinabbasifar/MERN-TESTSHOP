import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarOutline as StarOutlineIcon,
} from '@mui/icons-material';

const MuiRating = ({ value, text }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    let starIcon;
    if (value >= i) {
      starIcon = <StarIcon fontSize="small" />;
    } else if (value >= i - 0.5) {
      starIcon = <StarHalfIcon fontSize="small" />;
    } else {
      starIcon = <StarOutlineIcon fontSize="small" />;
    }
    stars.push(
      <Box key={i} component="span" sx={{ color: 'secondary.main', mr: 0.5 }}>
        {starIcon}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {stars}
      {text && (
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default MuiRating;
