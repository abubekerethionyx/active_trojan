/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@mui/material';
import PTChart from './PTChart';
import { ChartPaper } from './ChartPaper';
import { ChartListDialog } from './ChartListDialog';

const SimulationCharts = ({ chartData, isCollapsed }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedChart, setSelectedChart] = useState();
  const [eventSource, setEventSource] = useState(null);

// Function to register a Kafka client and listen for Kafka messages with a timeout
const registerKafkaClient = (clientId) => {
  // Initialize the EventSource with the Kafka registration endpoint
  const source = new EventSource(`/api/virtual-engine-kafka/register?clientId=${clientId}`);

  let timeoutId = null; // Initialize timeoutId

  source.onmessage = (event) => {
      clearTimeout(timeoutId); // Clear the previous timeout
      const data = JSON.parse(event.data);
      // Handle received Kafka message here, e.g., update your UI
      // eslint-disable-next-line no-console
      console.log('Received Kafka message:', data);

      // Set a new timeout to close the connection if no messages are received within 5 seconds (adjust as needed)
      timeoutId = setTimeout(() => {
          console.warn('Connection timed out. Closing EventSource.');
          source.close();
      }, 5000); // 5000 milliseconds (5 seconds)
  };


  source.onerror = (error) => {
      console.error('EventSource error:', error);
      clearTimeout(timeoutId); // Clear the timeout in case of an error
      source.close();
  };
    // EventSource

    source.addEventListener("bingo", e => console.log(`bingo: ${e.data}`));

  // Return the EventSource instance so you can manage it in your component
  return source;
};


  // Function to unregister the Kafka client
  const unregisterKafkaClient = () => {
    if (eventSource) {
      eventSource.close();
      // Optionally, call the API to unregister the client
      fetch(`/api/virtual-engine-kafka/unregister?clintId=${selectedChart}`, {
        method: 'GET',
      }).then(() => {
        // Handle success or error
      });
    }
  };

  // Effect to register the Kafka client when the component mounts
  useEffect(() => {
    if (selectedChart !== undefined) {
      registerKafkaClient('clintIddd');
    }

    // Cleanup: Unregister Kafka client when the component unmounts
    // return () => {
    //   unregisterKafkaClient();
    // };
  }, [selectedChart]);

  // Handle chart expansion
  const onExpand = (index, value) => {
    setExpanded(value);
    setSelectedChart(index);
  };

  return (
    <div>
      <Paper
        style={{
          padding: '20px',
          background: '#f5f5f5',
          overflowY: 'auto', // Make the chart list scrollable vertically
          overflowX: 'hidden', // Hide horizontal overflow
        }}
      >
        <style>
          {`
            /* Hide the vertical scrollbar */
            ::-webkit-scrollbar {
              width: 0;
            }

            /* Hide the horizontal scrollbar */
            ::-webkit-scrollbar {
              height: 0;
            }

            /* Hide both vertical and horizontal scrollbar in Firefox */
            * {
              scrollbar-width: none;
            }
          `}
        </style>
        <div
          style={{
            maxHeight: isCollapsed ? '80vh' : '50vh',
            overflow: 'auto',
            transition: 'max-height 0.5s ease',
          }}
        >
          <Grid container spacing={2} sx={{ padding: 0, overflow: 'auto' }}>
            {chartData.map((_chart, index) => (
              <>
                <Grid sx={{ padding: 0 }} key={index} item xs={12} sm={6} md={6} lg={6}>
                  <ChartPaper
                    chartName={`Chart-${index}`}
                    chartComponent={<PTChart />}
                    onExpand={onExpand}
                    id={index}
                    tabIndex={selectedChart}
                    expanded={expanded}
                  />
                </Grid>
                <ChartListDialog chartData={chartData} expanded={expanded} setExpanded={setExpanded} selectIndex={selectedChart} />
              </>
            ))}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default SimulationCharts;