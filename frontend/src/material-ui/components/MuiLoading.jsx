import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledLoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minHeight: '200px',
  padding: theme.spacing(4),
}));

const MuiLoading = () => {
  return (
    <StyledLoaderContainer>
      <LinearProgress
        sx={{
          width: '80%',
          maxWidth: '500px',
          height: 8,
          borderRadius: 4,
          backgroundColor: 'grey.300',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'primary.main',
          },
        }}
      />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, fontWeight: 'medium' }}
      >
        LOADING...
      </Typography>
    </StyledLoaderContainer>
  );
};

export default MuiLoading;
