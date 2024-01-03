import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  // Sort the data by date in ascending order

  // Calculate the cumulative sum of applications
  let cumulativeSum = 0;
  const cumulativeData = data.map((application) => {
    cumulativeSum += application.applications; // Assuming each application has an "applications" property
    return {
      length: data.length, // Assuming each application has a "date" property
      applications: cumulativeSum,
    };
  });

  // Utility function to get the month name
  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  return (
    <ResponsiveContainer width="50%" height="60%">
      <LineChart data={cumulativeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={getMonthName} />
        <YAxis />
        <Tooltip formatter={(value) => `Applications: ${value}`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="applications"
          name="Application Growth"
          stroke="#603392"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
