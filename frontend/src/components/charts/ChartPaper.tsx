import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

interface ChartPaperProps {
  expanded: boolean;
  chartName?: string;
  chartComponent: React.ReactNode;
  onExpand: () => void;
  height?: number; // Optional height prop
}

export const ChartPaper: React.FC<ChartPaperProps> = ({
  expanded,
  chartName,
  chartComponent,
  onExpand,
  height = 550, // Default minimum height of 550px
}) => {
  const handleExpand = () => {
    onExpand(); // Trigger expand/collapse functionality
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#f5f7fa", // Light background color for modern look
        borderRadius: "8px", // Add subtle rounding for a sleek feel
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: { xs: "none", md: "1px solid #ccc" },
          paddingBottom: "8px", // Add some space between the header and the chart content
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ fontSize: "12px", marginRight: "8px", fontWeight: 600 }} // Slightly bold for better visibility
        >
          {chartName}
        </Typography>
        {expanded ? (
          <FontAwesomeIcon
            icon={faCompress}
            onClick={handleExpand}
            style={{ cursor: "pointer", color: "#007bff" }} // Color to match modern style
          />
        ) : (
          <FontAwesomeIcon
            icon={faExpand}
            onClick={handleExpand}
            style={{ cursor: "pointer", color: "#007bff" }} // Color to match modern style
          />
        )}
      </Box>

      <Box
        style={{
          width: expanded ? "100%" : "auto",
          display: "block",
          minHeight: `${height}px`, // Ensure the minimum height is set
          backgroundColor: "#ffffff", // White background for the chart area
          padding: "16px", // Add padding around the chart
          borderRadius: "6px", // Smooth out the chart container edges
        }}
      >
        {chartComponent}
      </Box>
    </Paper>
  );
};
