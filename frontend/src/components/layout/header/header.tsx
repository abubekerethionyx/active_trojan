import React from "react";

const Header = () => {
  return (
    <header
      style={{
        width: "100%",
        height: "80px", // Fixed height for Header
        padding: "10px 20px",
        backgroundColor: "#0056b3", // Change to blue (Bootstrap primary blue)
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Dashboard</h1> {/* Reduce title size */}
    </header>
  );
};

export default Header;
