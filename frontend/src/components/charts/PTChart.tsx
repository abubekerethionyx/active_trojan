import React, { Component } from "react";
import Plot from "react-plotly.js";

interface PTChartState {
  pressureData: string[];
  temperatureData: string[];
}

class PTChart extends Component<object, PTChartState> {
  constructor(props: object) {
    super(props);

    const pressureData: string[] = [];
    const temperatureData: string[] = [];

    let pressure = 1; 
    let temperature = 273; 

    const pressureIncreaseFactor = 0.2; 
    const temperatureIncreaseFactor = 1.2;

    for (let i = 0; i < 100; i++) {
      pressure += pressureIncreaseFactor;

      temperature *= temperatureIncreaseFactor;

      pressureData.push(pressure.toFixed(2));
      temperatureData.push(temperature.toFixed(2));
    }

    this.state = {
      pressureData,
      temperatureData,
    };
  }

  render() {
    const { pressureData, temperatureData } = this.state;

    const data = [
      {
        x: temperatureData,
        y: pressureData,
        type: "scatter",
        mode: "lines",
        name: "Pressure vs. Temperature",
      },
    ];

    const layout = {
      title: "P-T Chart",
      xaxis: {
        title: "Temperature (K)",
      },
      yaxis: {
        title: "Pressure (prasuer cyl / bar)",
      },
    };

    return (
      <div>
        <Plot data={data} layout={layout}   style={{ width: '100%' }} />
      </div>
    );
  }
}

export default PTChart;
