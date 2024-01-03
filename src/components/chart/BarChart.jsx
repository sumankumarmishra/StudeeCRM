// BarChart.js
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ applications }) => {
  const labels = applications.map((row) => row.name);
  const length = applications.map((row) => row.length);
  // Sample data for the bar chart

  const predefinedColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(201, 203, 207, 0.6)",
    "rgba(255, 77, 77, 0.6)",
    "rgba(255, 191, 128, 0.6)",
    "rgba(255, 223, 186, 0.6)",
    "rgba(144, 238, 144, 0.6)",
    "rgba(173, 216, 230, 0.6)",
    "rgba(255, 182, 193, 0.6)",
    "rgba(173, 255, 47, 0.6)",
    "rgba(240, 230, 140, 0.6)",
    "rgba(32, 178, 170, 0.6)",
    "rgba(135, 206, 250, 0.6)",
    "rgba(255, 228, 181, 0.6)",
    "rgba(100, 149, 237, 0.6)",
    "rgba(250, 128, 114, 0.6)",
  ];

  // Use the predefined colors for the first 20 universities
  const backgroundColors = predefinedColors.slice(0, labels.length);
  const borderColor = backgroundColors.map((color) =>
    color.replace("0.6", "1")
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Intake",
        data: length,
        backgroundColor: backgroundColors,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: [
        {
          beginAtZero: true,
          stepSize: 1, // Set the step size to 1 for whole numbers
        },
      ],
      y: [
        {
          beginAtZero: true,
          precision: 0,
          stepSize: 1, // Set the step size to 1 for whole numbers
        },
      ],
    },
    elements: {
      bar: {
        barPercentage: 0.3,
        categoryPercentage: 0.3,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
