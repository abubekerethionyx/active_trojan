import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) { // Check for non-empty query
      onSearch(searchQuery); // Pass the query back to parent component
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      mb={2} 
      gap={1} 
      width="100%" // Full width for better responsiveness
      sx={{ 
        maxWidth: '600px', // Max width to keep it modern
        mx: 'auto', // Center horizontally
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Modern shadow effect
      }}
    >
      <TextField
        variant="outlined"
        label="Search Reviews"
        value={searchQuery}
        size='small'
        fullWidth
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress} // Add key press event
        sx={{ borderRadius: '4px', backgroundColor: '#f7f7f7' }} // Light background for better visibility
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearch}
        sx={{ 
          borderRadius: '4px', 
          padding: '10px 20px', 
          '&:hover': {
            backgroundColor: '#1976d2', // Darker shade on hover
          }
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
