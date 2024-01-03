import Chart from "react-apexcharts";
import React from "react";
import "./PieChart.css";
function Piechart() {
  return (
    <React.Fragment>
      <div className="column-chart">
        <h3 className="chart-heading">Reporting</h3>
        <Chart
          className="column-piechart"
          type="pie"
          width={500}
          height={550}
          series={[20, 30, 50]}
          options={{
            colors: ["#603392", "#ffc6f9", "#D8BFD8"],
            labels: ["Vendors", "Users", "Devices"],
          }}></Chart>
      </div>
    </React.Fragment>
  );
}
export default Piechart;
