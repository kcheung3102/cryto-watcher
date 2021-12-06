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
import { Bar, Line} from "react-chartjs-2";
import CircularProgress from "@mui/material/CircularProgress";
import { HistoricalChart } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import moment from "moment";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { VolumeChart } from '../VolumeChart/VolumeChart';

export const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();

  const chartDays = [
    {
      label: "Last 24 Hours",
      value: 1,
    },
    {
      label: "Last 7 days",
      value: 7,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  const fetchChartData = async () => {
    const response = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await response.json();
    console.log(data);
    setHistoricalData(data);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });


  useEffect(() => {
    fetchChartData();
  }, [days, currency]);

  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
  

  };

  const dateData = {
    
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Divider />
        <Grid container>
          <Grid item justify="center">
          <Container>
              {chartDays.map((day) => (
                <Button
                  color="#EEBC1D"
                  variant="outline"
                  key={day.value}
                  onClick={() => setDays(day.value)}
                >
                  {day.label}
                </Button>
              ))}
            </Container>
          </Grid>
          <Grid item xs={12} lg={6}>

        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.prices.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = moment(date).format("hh:mm a");
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.prices.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  }
                ],
              }}
              options={options}
            />
            </>
        )}
          </Grid>
          <Grid item xs={12} lg={6}>
              <VolumeChart  historicalData={historicalData} days={days}/>
          </Grid>
          {/* <Grid item xs={12} lg={12}>
          {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.prices.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = moment(date).format("hh:mm a");
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.prices.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  }
                ],
              }}
              options={options}
            />
            </>
        )}
          </Grid> */}
        </Grid>
      
      </Container>
    </ThemeProvider>
  );
};
