import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <TextField 
      fullWidth 
      variant="outlined" 
      placeholder="Cerca nei post..." 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 4 }}
    />
  );
};

export default SearchBar;