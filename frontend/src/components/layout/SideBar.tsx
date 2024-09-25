import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const SideBar = () => {
  return (
    <Box
      sx={{
        width: "200px", // Fixed width for sidebar
        height: "100%", // Full height of the container
        backgroundColor: "#007BFF", // Sidebar background color
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        <ListItem >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem >
          <ListItemText primary="About" />
        </ListItem>
        <ListItem >
          <ListItemText primary="Services" />
        </ListItem>
        <ListItem >
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
