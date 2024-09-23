import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
 
  const handleSearch = () => {
    onSearch(searchQuery); // Pass the query back to parent component
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={2} gap={1}>
      <TextField
        variant="outlined"
        label="Search Reviews"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
