import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ data }) => {
  const options = {
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="relative">
      <Doughnut data={data} options={options} aria-label="Spending distribution chart" />
    </div>
  );
};

export default DoughnutChart;