import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Collapse,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface ReviewCardProps {
  review :any,
  isExpanded: boolean;
  onToggleExpand: (index: number) => void;
  index: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  isExpanded,
  onToggleExpand,
  index,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 300,
        minHeight:250,
        margin: "10px auto",
        borderRadius: "12px",
        boxShadow: theme.shadows[4],
        backgroundColor: "#f9f9f9",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
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

        <Typography variant="caption" color="text.secondary" sx={{ marginBottom: 1 }}>
          Reviewed on {review?.published_at}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => onToggleExpand(index)} // Call the toggle function with the index
            size="small"
            color="primary"
            sx={{
              transition: "transform 0.3s ease",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </CardContent>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Additional information about the review goes here.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
