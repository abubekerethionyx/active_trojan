// LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ reviewData }) => {
  const data = {
    labels: reviewData.result.map(item => item.rating), // Ratings as labels
    datasets: [
      {
        label: reviewData.display.title, // Title from display
        data: reviewData.result.map(item => item.count), // Counts as data points
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: reviewData.display.x_axis, // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: reviewData.display.y_axis, // Y-axis title
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
