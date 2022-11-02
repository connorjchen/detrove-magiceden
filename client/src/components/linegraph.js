import { Box, Typography, Button, useTheme, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Line } from "react-chartjs-2";
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

export default function LineGraph() {
  const theme = useTheme();

  const [data, setData] = useState({});

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <Box borderRadius="16px" height="100%">
      <Box>
        <Typography variant="h1" fontSize="32px">
          $114,656,84
        </Typography>

        <Typography variant="h1" fontSize="14px">
          $142.90 (-0,12) Today
        </Typography>
      </Box>
      <Box
        sx={{
          height: "80%",
        }}
      >
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
      <Box>
        {/* <ButtonGroup
          size="large"
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            style={{
              fontWeight: "bold",
            }}
            sx={{
              "&.Mui-selected": {
                background: "rgba(22, 22, 26, 0.5)",
              },
            }}
            onClick={() => console.log("hi")}
          >
            LIVE
          </Button>
          <Button
            style={{
              fontWeight: "bold",
            }}
            sx={{
              "&.active": {
                background: "black",
              },
            }}
            onClick={() => console.log("hi")}
          >
            1D
          </Button>
          <Button
            style={{
              fontWeight: "bold",
            }}
            onClick={() => console.log("hi")}
          >
            {" "}
            1W{" "}
          </Button>
          <Button
            style={{
              fontWeight: "bold",
            }}
            onClick={() => console.log("hi")}
          >
            {" "}
            1M{" "}
          </Button>
          <Button
            style={{
              fontWeight: "bold",
            }}
            onClick={() => console.log("hi")}
          >
            {" "}
            3M{" "}
          </Button>
          <Button
            style={{
              fontWeight: "bold",
            }}
            onClick={() => console.log("hi")}
          >
            {" "}
            1Y{" "}
          </Button>
          <Button
            style={{
              fontWeight: "bold",
            }}
            onClick={() => console.log("hi")}
          >
            {" "}
            ALL{" "}
          </Button>
        </ButtonGroup> */}
        <Tabs
          variant="standard"
          textColor="black"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              "&.Mui-selected": {
                outline: "none",
                background: "rgba(22, 22, 26, 0.1)",
              },
              fontWeight: "bold",
            }}
            label="LIVE"
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                outline: "none",
                background: "rgba(22, 22, 26, 0.1)",
              },
              fontWeight: "bold",
            }}
            label="1D"
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                outline: "none",
                background: "rgba(22, 22, 26, 0.1)",
              },
              fontWeight: "bold",
            }}
            label="1W"
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                outline: "none",
                width: "50px",
              },
              fontWeight: "bold",
              margin: "0",
            }}
            label="1M"
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                outline: "none",
                width: "50px",
              },
              fontWeight: "bold",
              margin: "0",
            }}
            label="3M"
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                outline: "none",
                width: "50px",
              },
              fontWeight: "bold",
              margin: "0",
            }}
            label="1Y"
          />
          <Tab
            sx={{
              "&.Mui-selected": {
                outline: "none",
                width: "50px",
              },
              fontWeight: "bold",
              margin: "0",
            }}
            label="ALL"
          />
        </Tabs>
      </Box>
    </Box>
  );
}
