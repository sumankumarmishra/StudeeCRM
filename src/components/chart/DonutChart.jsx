import React from "react";
import { Doughnut } from "react-chartjs-2";

const DonutChart = ({ applications }) => {
  const statuses = applications.map((row) => row.status);
  const length = applications.map((row) => row.length);
  // Sample data for the donut chart

  const staticColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#66CCCC",
    "#FFD700",
    "#8A2BE2",
    "#32CD32",
    "#FF6347",
    "#4682B4",
    "#FF4500",
    "#8B4513",
    "#00CED1",
    "#8B008B",
    "#00FF7F",
    "#1E90FF",
    "#FFDAB9",
    "#7B68EE",
  ];

  const backgroundColor = staticColors.slice(0, statuses.length);
  const hoverBackgroundColor = staticColors.slice(0, statuses.length);

  const data = {
    labels: statuses,
    datasets: [
      {
        data: length,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
      },
    ],
  };

  const options = {
    cutout: "70%", // Adjust the cutout percentage to create a donut chart
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
