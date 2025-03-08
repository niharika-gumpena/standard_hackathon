import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData }) => {
    return (
      <div>
        <h3>Chart Title</h3>
        <Line data={chartData} width={20} height={10} /> {/* Set width and height */}
      </div>
    );
  };
  

export default LineChart;
