import { Box, Typography, useTheme, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  legend: {
    display: false,
  },
  hover: {
    intersect: false,
  },
  elements: {
    line: {
      tension: 0,
    },
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {},
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};

function StyledTab({ label }) {
  return (
    <Tab
      sx={{
        minWidth: "initial",
      }}
      label={label}
    />
  );
}

export default function LineGraph() {
  const theme = useTheme();

  const [data, setData] = useState({});
  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    let data = [];
    let value = 50;
    for (var i = 0; i < 366; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
      data.push({ x: date, y: value });
    }
    setData(data);
  }, []);

  return (
    <Box
      borderRadius="16px"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Typography variant="h6" fontSize="24px">
          $114,656,84
        </Typography>
        <Typography variant="h6" fontSize="14px">
          $142.90 (-0,12) Today
        </Typography>
      </Box>
      <Box height="100%">
        {data?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: "white",
                  borderColor: "#5AC53B",
                  borderWidth: 2,
                  pointBorderColor: "rgba(0, 0, 0, 0)",
                  pointBackgroundColor: "rgba(0, 0, 0, 0)",
                  pointHoverBackgroundColor: "#5AC53B",
                  pointHoverBorderColor: "#000000",
                  pointHoverBorderWidth: 4,
                  pointHoverRadius: 6,
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )}
      </Box>
      <Box marginLeft="48px">
        <Tabs
          textColor="black"
          value={tab}
          onChange={(_, tab) => setTab(tab)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab label="LIVE" />
          <Tab label="1D" />
          <Tab label="1W" />
          <Tab label="1M" />
          <Tab label="3M" />
          <Tab label="1Y" />
          <Tab label="ALL" />
        </Tabs>
      </Box>
    </Box>
  );
}
