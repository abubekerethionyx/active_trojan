import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

export const ChartPaper = ({ expanded, chartName, chartComponent, onExpand }) => {
  const handleExpand = () => {
    onExpand(); // Trigger expand/collapse functionality
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: { xs: "none", md: "1px solid #ccc" },
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ fontSize: "12px", marginRight: "8px" }}
        >
          {chartName}
        </Typography>
        {expanded ? (
          <FontAwesomeIcon
            icon={faCompress}
            onClick={handleExpand}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faExpand}
            onClick={handleExpand}
            style={{ cursor: "pointer" }}
          />
        )}
      </Box>

      <Box
        style={{
          width: expanded ? "100%" : "auto",
          display: "block",
        }}
      >
        {chartComponent}
      </Box>
    </Paper>
  );
};
