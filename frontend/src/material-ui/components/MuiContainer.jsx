import React from 'react';
import { Container, Box } from '@mui/material';

const MuiContainer = ({ children }) => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
        }}
      >
        <Box sx={{ width: '100%' }}>{children}</Box>
      </Box>
    </Container>
  );
};

export default MuiContainer;
