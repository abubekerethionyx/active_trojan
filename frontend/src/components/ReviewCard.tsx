import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export const ReviewCard = ({ review }) => {
  const [reviews,setReviews]= useState(review)
  useEffect(() => {
   setReviews(reviews)
  }, [reviews]);
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2 }}>
      <CardContent>
        {/* Place Name */}
        <Typography variant="h5" component="div" gutterBottom>
          {reviews?.place_name}
        </Typography>

        {/* Rating */}
        <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
          <StarIcon color="primary" />
          <Typography variant="body1" sx={{ marginLeft: 0.5 }}>
            {reviews?.rating} / 5.0
          </Typography>
        </Box>

        {/* Review Text */}
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          {reviews?.review_text}
        </Typography>

        {/* Published Info */}
        <Typography variant="body2" color="text.secondary">
          Reviewed {reviews?.published_at} (on {reviews?.published_at_date})
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        {/* Owner's Response */}
        {reviews?.response_from_owner_text && (
          <Box>
            <Typography variant="body1" gutterBottom>
              Response from Owner:
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              {reviews?.response_from_owner_text}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Responded {reviews?.response_from_owner_ago} (on{" "}
              {reviews?.response_from_owner_date})
            </Typography>
          </Box>
        )}

        <Divider sx={{ marginY: 2 }} />

        {/* Reviewer's Details */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            Reviewer has posted {reviews?.total_number_of_reviews_by_reviewer}{" "}
            reviews.
          </Typography>
          {reviews?.is_local_guide ? (
            <Typography variant="body2" color="text.secondary">
              Local Guide
            </Typography>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};
