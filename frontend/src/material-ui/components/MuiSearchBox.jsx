import React, { useState } from 'react';
import { Box, TextField, Button, Stack, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const StyledSearchStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  gap: theme.spacing(1),
  // Small screen
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
  },
  // Desktop view
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const MuiSearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  const theme = useTheme();
  return (
    <Box component="form" onSubmit={submitHandler} sx={{ width: '100%' }}>
      <StyledSearchStack>
        <TextField
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search..."
          variant="outlined"
          size="small"
          sx={{
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: theme.palette.background.paper,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            minWidth: 'auto',
            padding: '6px 12px',
            borderRadius: '20px',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <SearchIcon />
        </Button>
      </StyledSearchStack>
    </Box>
  );
};

export default MuiSearchBox;
