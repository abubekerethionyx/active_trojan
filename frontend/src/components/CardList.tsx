import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  Tabs,
  Tab,
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
import { ChartListDialog } from "../components/charts/ChartListDialog";
import CsvDialog from "../components/CsvDialog"; // Import the combined CSV dialog component

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ResultDisplay = () => {
  const [data, setData] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedChart, setSelectedChart] = useState<ReviewData | null>();
  const [expandedIndex, setExpandedIndex] = useState<Record<number, boolean>>(
    {}
  );
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSearch = (search: string) => {
    setSearchQuery(search.toLowerCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reviews`);
        const result = await response.json();
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: searchQuery }),
        });
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    if (searchQuery) fetchData();
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
    <Box sx={{ width: "100%", marginRight: "15px" }}>
      {/* Search bar and CSV upload section */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <Button
          variant="contained"
          onClick={() => setCsvDialogOpen(true)}
          sx={{ height: "fit-content" }}
        >
          Upload CSV
        </Button>
      </Box>

      {/* Chart display grid */}
      <Grid container spacing={2}>
        {barAndPieCharts.map((chart, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
          </Grid>
        ))}
      </Grid>

      {/* Table and Cards */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {reviewCards.map((chart, chartIndex) => (
          <Grid item xs={12} key={chartIndex}>
            {chart?.display?.type === "TABLE" && (
              <ChartPaper
                chartComponent={<ReviewTable reviewData={chart} />}
                onExpand={() => handleExpandChart(chart)}
                expanded={expanded}
              />
            )}
            <Grid item xs={12}>
              {chart?.display?.type === "CARD" && (
                <ChartPaper
                  chartComponent={
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      gap={2}
                      sx={{
                        "& > *": {
                          flex: "1 1 calc(33.33% - 16px)",
                          maxWidth: "calc(33.33% - 16px)",
                          minWidth: "250px",
                        },
                      }}
                    >
                      {chart?.result?.map((singleData, index) => (
                        <Grid item>
                          <ReviewCard
                            review={singleData}
                            isExpanded={!!expandedIndex[index]}
                            onToggleExpand={handleToggleExpand}
                            index={index}
                          />
                        </Grid>
                      ))}
                    </Box>
                  }
                  onExpand={() => handleExpandChart(chart)}
                  expanded={expanded}
                />
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Combined CSV Dialog for all 3 CSV upload methods */}
      <CsvDialog open={csvDialogOpen} onClose={() => setCsvDialogOpen(false)} />

      {/* Dialog for expanded charts */}
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
