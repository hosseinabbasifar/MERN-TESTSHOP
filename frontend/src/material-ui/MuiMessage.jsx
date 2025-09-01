import React, { useState } from 'react';
import { Alert, Box, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// استایل‌دهی سفارشی برای کامپوننت Message
const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[1],
  marginTop: theme.spacing(2),
  '& .MuiAlert-icon': {
    fontSize: 22,
  },
  '& .MuiAlert-message': {
    fontWeight: 'normal',
  },
}));

const MuiMessage = ({ severity = 'info', children }) => {
  const [open, setOpen] = useState(true);

  if (!open) {
    return null;
  }

  // ترجمه پراپ‌های بوت‌استرپ به Material-UI
  const muiSeverity = (severity) => {
    switch (severity) {
      case 'danger':
        return 'error';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <StyledAlert
      severity={muiSeverity(severity)}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {children}
    </StyledAlert>
  );
};

export default MuiMessage;
