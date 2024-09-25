import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track if content is expanded

  // Toggle expand state
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ maxWidth: 300, padding: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          {review?.place_name}
        </Typography>

        <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
          <StarIcon color="primary" />
          <Typography variant="body1" sx={{ marginLeft: 0.5 }}>
            {review?.rating} / 5.0
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {isExpanded
            ? review?.review_text
            : review?.review_text?.slice(0, 100) +
              (review?.review_text?.length > 100 ? "..." : "")}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          Reviewed {review?.published_at} (on {review?.published_at_date})
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
        >
          <IconButton onClick={handleExpandClick} size="small" color="primary">
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
