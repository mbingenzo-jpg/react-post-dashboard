
import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { useColorTheme } from '../../context/ThemeContext'; 

const Header: React.FC = () => {
  const { mode, toggleTheme } = useColorTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Post Dashboard
      </Typography>
      
      <FormControlLabel
        control={
          <Switch 
            checked={mode === 'dark'} 
            onChange={toggleTheme} 
            color="primary" 
          />
        }
        label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
      />
    </Box>
  );
};

export default Header;