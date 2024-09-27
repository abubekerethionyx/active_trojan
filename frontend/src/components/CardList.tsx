import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ReviewCard } from "./ReviewCard";
import { ReviewChart } from "./graphs/ChartCard";
import SearchBar from "./SearchBar";
import PieChart from "./graphs/PieChart";
import { ChartPaper } from "./charts/ChartPaper";
import { API_URL } from "../constants/Constants";
import LineChart from "./graphs/LineChart";
import ReviewTable from "./graphs/ReviewTable";
import { ChartListDialog } from "../components/charts/ChartListDialog"; // Import the Dialog

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ResultDisplay = () => {
  const [data, setData] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedChart, setSelectedChart] = useState<ReviewData|null>();

  const handleSearch = (search: string) => {
    setSearchQuery(search.toLowerCase());
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reviews`);
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/sql-query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchQuery,
          }),
        });
        const result = await response.json();
        console.log("search", result);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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

  const handleClose = () => {
    setExpanded(false);
    setSelectedChart(null);
  };

  const handleExpandChart = (chart: ReviewData) => {
    setSelectedChart(chart);
    setExpanded(true);
  };

  const barAndPieCharts = data.filter(
    (chart) =>
      chart?.display?.type === "BAR" ||
      chart?.display?.type === "PIE" ||
      chart?.display?.type === "LINE"
  );

  const reviewCards = data.filter(
    (chart) =>
      chart?.display?.type === "CARD" || chart?.display?.type === "TABLE"
  );

  return (
    <Box sx={{ width: "100%", padding: "15px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          height: "auto",
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          width: "100%",
          flexGrow: 1,
          height: "auto",
          justifyContent: searchQuery ?  "center" :"start"
        }}
      >
        {barAndPieCharts.map((chart, index) => (
          <Box sx={{ display: "flex", flexDirection: "row" }} key={index}>
            {chart?.display?.type === "BAR" && (
              <ChartPaper
                chartName={`${chart?.display?.type}-chart`}
                chartComponent={<ReviewChart reviewData={chart} />}
                onExpand={() => handleExpandChart(chart)}
                expanded={expanded}
              />
            )}
            {chart?.display?.type === "PIE" && (
              <ChartPaper
                chartName={`${chart?.display?.type}-chart`}
                chartComponent={<PieChart reviewData={chart} />}
                onExpand={() => handleExpandChart(chart)}
                expanded={expanded}
              />
            )}
            {chart?.display?.type === "LINE" && (
              <ChartPaper
                chartName={`${chart?.display?.type}-chart`}
                chartComponent={<LineChart reviewData={chart} />}
                onExpand={() => handleExpandChart(chart)}
                expanded={expanded}

              />
            )}
          </Box>
        ))}
      </Box>
      
      <Box>
        {reviewCards.map((chart, chartIndex) => (
          <Box key={chartIndex} sx={{ width: "92%" }}>
            {chart?.display?.type === "TABLE" && (
              <Box key={`table-${chartIndex}`}>
                <ChartPaper
                  chartName={`${chart.display.type}-chart`}
                  chartComponent={<ReviewTable reviewData={chart} />}
                  onExpand={() => handleExpandChart(chart)}
                  expanded={expanded}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        width="92%"
        sx={{
          mt: 5,
          "& > *": {
            flex: "1 1 calc(33.33% - 16px)",
            maxWidth: "calc(33.33% - 16px)",
            minWidth: "250px",
          },
        }}
      >
        {reviewCards.map(
          (chart) =>
            chart.display.type === "CARD" &&
            chart?.result?.map((singleData, index) => (
              <ReviewCard key={index} review={singleData} />
            ))
        )}
      </Box>

      {selectedChart && (
        <ChartListDialog
          chartData={selectedChart}
          expanded={expanded}
          setExpanded={setExpanded}
          selectIndex={selectedChart?.display?.type}
          chartType={selectedChart?.display?.type}
        />
      )}
    </Box>
  );
};

export default ResultDisplay;
