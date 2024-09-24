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
        setData(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, apiEndpoint]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 5, width: '100%', marginTop: '25px' }}>
      {/* Search bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Render charts or cards conditionally */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {/* Render Bar Chart */}
        {data?.display?.type === "BAR" && (
          <Grid item xs={12} md={8}>
            <ReviewChart reviewData={data} />
          </Grid>
        )}

        {/* Render Pie Chart */}
        {data?.display?.type === "PIE" && (
          <Grid item xs={12} md={8}>
            <PieChart reviewData={data} />
          </Grid>
        )}

        {/* Render Review Cards */}
        {data?.display?.type === "CARD" && (
          <Grid item xs={12}>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              gap={2}
              sx={{ mt: 2 }}
            >
              {data?.result?.map((singleData, index) => (
                <ReviewCard key={index} review={singleData} />
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ResultDisplay;
