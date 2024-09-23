import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ReviewCard } from "./ReviewCard";
import { ReviewChart } from "./ChartCard";
import SearchBar from "./SearchBar";
import PieChart from "./PieChart";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ResultDisplay = () => {
  const apiEndpoint = "http://localhost:5000/api/sql-query";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (search) => {
    setSearchQuery(search.toLowerCase());
  };


  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchQuery,
          }),
        });

        const result = await response.json();
        console.log("result", result);
        setData(result.result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, apiEndpoint]); // Include searchQuery in the dependency array

  // Generate chart data
  const chartData = {
    labels: data ? data.map((item) => item.label) : [],
    datasets: [
      {
        label: "Values",
        data: data ? data.map((item) => item.value) : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Search bar placed at the top */}
      <SearchBar onSearch={handleSearch} />
        <Grid item xs={12} sm={6}>
          <ReviewChart reviews={data} />
        </Grid>
      
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <PieChart reviews={data}/>

        {/* Chart Card */}

        {/* Review Cards */}
        <Grid item xs={12}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
            overflow="auto"
            gap={2} // Adds space between cards
          >
            {data?.map((singleData, index) => (
              <ReviewCard key={index} review={singleData} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultDisplay;
