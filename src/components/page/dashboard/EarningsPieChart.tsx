"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ReactApexChart with SSR disabled
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Define the structure of the pie chart options
interface PieChartOptions {
  series: number[];
  options: ApexOptions;
}

interface ChartProps {
  totalEarnings: number;
  todayEarnings: number;
  totalUsers: number;
  totalRequests: number;
}
// Create a functional component for the pie chart
const PieChartComponent: React.FC<ChartProps> = ({
  totalEarnings,
  todayEarnings,
  totalUsers,
  totalRequests,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Set isMounted to true after component mounts on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define pie chart data and options
  const pieChart: PieChartOptions = {
    series: [totalEarnings, todayEarnings, totalUsers, totalRequests],
    options: {
      chart: {
        height: 300,
        type: "pie",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      labels: [
        "Total Earnings",
        "Today's Earnings",
        "Total User",
        "Total Requests",
      ],
      colors: ["#00ab55", "#0D7E94", "#805dca", "#e7515a"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      stroke: {
        show: false,
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div>
      {isMounted && (
        <ReactApexChart
          series={pieChart.series}
          options={pieChart.options}
          className="rounded-lg bg-white"
          type="pie"
          height={300}
          width={"100%"}
        />
      )}
    </div>
  );
};

export default PieChartComponent;
