import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ChartPaper } from "./ChartPaper";
import { ReviewChart } from "../graphs/ChartCard";
import LineChart from "../graphs/LineChart";
import PieChart from "../graphs/PieChart";

// Import your chart components

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialog-paper": {
    borderRadius: "10px", // Optional: Customize dialog paper styling
  },
}));

export const ChartListDialog = ({ chartData, expanded, setExpanded, selectIndex, chartType }:{chartData: ReviewData, expanded: boolean, setExpanded: Function, selectIndex: string, chartType: string }) => {
  const dialogRef = React.useRef(null);

  const handleClose = () => {
    setExpanded(false); // Properly close the dialog by setting expanded to false
  };

  // Function to select the correct chart based on chartType
  const renderChartComponent = () => {
    switch (chartType) {
      case "BAR":
        return <ReviewChart reviewData={chartData} />;
      case "PIE":
        return <PieChart reviewData={chartData} />;
      case "LINE":
        return <LineChart reviewData={chartData} />;
      default:
        return <div>No chart available</div>;
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={expanded}
        fullWidth
        maxWidth="md"
        ref={dialogRef}
      >
        <DialogContent dividers sx={{ position: 'relative' }}>
          <ChartPaper
            key={selectIndex}
            chartName={`${chartType}-Chart-${selectIndex}`}
            chartComponent={renderChartComponent()}
            onExpand={handleClose}
            expanded={expanded}
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};
