import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ReviewChart = ({ reviews }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!reviews || reviews.length === 0) {
      return;
    }

    // Transform data to group reviews by published date
    const groupedReviews = reviews.reduce((acc, review) => {
      const date = review.published_at_date;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(groupedReviews);
    const data = Object.values(groupedReviews);

    // Set the chart data
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Number of Reviews',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [reviews]);

  if (!chartData) {
    return <Typography>Loading Chart...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Reviews Over Time
        </Typography>
        <Bar data={chartData} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
};
