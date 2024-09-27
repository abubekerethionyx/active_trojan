import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const SideBar = () => {
  return (
    <Box
      sx={{
        width: "200px", // Fixed width for sidebar
        height: "100%", // Full height of the container
        minHeight:"100vh",
        backgroundColor: "#EA4886", // Sidebar background color
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        <ListItem
          component="button"
          sx={{ background: "inherit", color: "white" }}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          component="button"
          sx={{ background: "inherit", color: "white" }}
        >
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem
          component="button"
          sx={{ background: "inherit", color: "white" }}
        >
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem
          component="button"
          sx={{ background: "inherit", color: "white" }}
        >
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
