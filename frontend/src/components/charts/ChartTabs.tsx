import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import SimulationCharts from './ChartsList';

export const ChartTabs = ({ cycleData, isCollapsed }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          backgroundColor: 'lightgray',
        }}
      >
        <Tab label="Simulation" sx={{ fontSize: 13, color: '#00344C' }} />
        <Tab label="Performance" sx={{ fontSize: 13, color: '#00344C' }} />
        <Tab label="Components" sx={{ fontSize: 13, color: '#00344C' }} />
      </Tabs>
      {value === 0 && <SimulationCharts chartData={cycleData.simulationCharts} isCollapsed={isCollapsed} />}
      {value === 1 && <SimulationCharts chartData={cycleData.performanceCharts} isCollapsed={isCollapsed} />}
      {value === 2 && <SimulationCharts chartData={cycleData.componentsCharts} isCollapsed={isCollapsed} />}
    </Box>
  );
};
