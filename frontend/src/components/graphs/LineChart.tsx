import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Registering necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ reviewData }) => {
  // Extracting x and y values based on specified display properties
  const xKey = reviewData.display.x_axis; // Key for x-axis values
  const yKey = reviewData.display.y_axis; // Key for y-axis values

  // Check if keys are provided and map to the data accordingly
  const xValues = reviewData.result.map(item => item[xKey]); // x-values from specified key
  const yValues = reviewData.result.map(item => item[yKey]); // y-values from specified key

  const data = {
    labels: xValues.length ? xValues : ['No data'], // Use dynamic x-values or fallback to "No data"
    datasets: [
      {
        label: reviewData.display.title || "Data", // Title from display
        data: yValues.length ? yValues : [0], // Use dynamic y-values or fallback to 0
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
          text: reviewData.display.x_axis || 'X-Axis', // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: reviewData.display.y_axis || 'Y-Axis', // Y-axis title
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
