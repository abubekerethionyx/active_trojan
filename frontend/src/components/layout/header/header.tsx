import React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications'; // Material UI notification icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Material UI profile icon

const Header = () => {
  return (
    <header
      style={{
        width: "100%",
        height: "70px", // Fixed height for Header
        padding: "10px 20px",
        backgroundColor: "#0F265D", // Change to blue (Bootstrap primary blue)
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo />
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Dashboard</h1>
      </div>
      {/* Icons section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", paddingRight:"35px"}}>
        <NotificationsIcon style={{ fontSize: "30px", cursor: "pointer" }} />
        <AccountCircleIcon style={{ fontSize: "40px", cursor: "pointer" }} />
      </div>
    </header>
  );
};

export default Header;

const Logo = () => {
  return (
    <img
      src="/logo.svg" // The path to the SVG in the public folder
      alt="Logo"
      width="40"
      height="40"
      style={{ marginRight: "10px" }} // Add spacing between logo and text
    />
  );
};
