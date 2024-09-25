// ReviewTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ReviewTable = ({ reviewData }: { reviewData: ReviewData }) => {
  // Check if result is not empty
  if (!reviewData.result?.length) {
    return (
      <Typography variant="h6" align="center" sx={{ margin: 2 }}>
        No review data available.
      </Typography>
    );
  }

  // Get headers dynamically from the keys of the first object in the result array
  const headers = Object.keys(reviewData.result[0]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>
                <Typography variant="h6">
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewData.result.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <TableCell key={cellIndex}>{item[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewTable;
