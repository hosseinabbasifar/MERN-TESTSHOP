import React from 'react';
import { Alert, IconButton, Collapse, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmber,
} from '@mui/icons-material';

const MuiMessage = ({ severity = 'info', children, onClose }) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const severityMap = {
    danger: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info',
  };

  const iconMap = {
    error: <ErrorOutline />,
    success: <CheckCircleOutline />,
    warning: <WarningAmber />,
    info: <InfoOutlined />,
  };

  const actualSeverity = severityMap[severity] || severity;

  return (
    <Collapse in={open}>
      <Alert
        severity={actualSeverity}
        icon={iconMap[actualSeverity]}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          borderRadius: 2,
          mb: 2,
          border: `1px solid ${alpha(theme.palette[actualSeverity].main, 0.3)}`,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette[actualSeverity].main, 0.1)
              : alpha(theme.palette[actualSeverity].light, 0.1),
          '& .MuiAlert-icon': {
            fontSize: 24,
          },
          '& .MuiAlert-message': {
            fontSize: '0.95rem',
            fontWeight: 400,
          },
        }}
      >
        {children}
      </Alert>
    </Collapse>
  );
};

export default MuiMessage;
