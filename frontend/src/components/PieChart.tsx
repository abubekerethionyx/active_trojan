import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ review }) => {
  // Check if the review data is valid before processing
  if (!review || review.length === 0) {
    return (
      <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            No Data Available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Group the likes by the review date
  const likesPerDate = review.reduce((acc, review) => {
    const date = review.published_at_date;
    acc[date] = (acc[date] || 0) + review.review_likes_count;
    return acc;
  }, {});

  const labels = Object.keys(likesPerDate); // Dates
  const likes = Object.values(likesPerDate); // Number of likes per date

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Likes',
        data: likes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Total Likes per Date
        </Typography>
        <Pie data={chartData} />
      </CardContent>
    </Card>
  );
};

export default PieChart;
