import React from 'react';
import { Container, Box } from '@mui/material';

const MuiContainer = ({ children, maxWidth = 'sm', centered = true }) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 4 }}>
      {centered ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <Box sx={{ width: '100%' }}>{children}</Box>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>{children}</Box>
      )}
    </Container>
  );
};

export default MuiContainer;
