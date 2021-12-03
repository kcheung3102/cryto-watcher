import React,{ useState, useEffect} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import { HistoricalChart } from '../../config/api';
import { CryptoState } from "../../CryptoContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from '@mui/material';
import moment from 'moment';


export const CoinChart = ({coin}) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency, symbol } = CryptoState(); 

    const chartDays = [
        {
          label: "Last 24 Hours",
          value: 1
        },
        {
          label: "Last 7 days",
          value: 7
        },
        {
          label: "30 Days",
          value: 30
        },
        {
          label: "3 Months",
          value: 90
        },
        {
          label: "1 Year",
          value: 365
        },
      ]

    const fetchChartData = async() => {
        const response = await fetch(HistoricalChart(coin.id, days, currency));
         const data = await response.json();
         console.log(data);
         setHistoricalData(data.prices);
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
    }, [days]);


     console.log(historicalData);

    return (
       <ThemeProvider theme={darkTheme}>
           <Container>
           {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          /> ) : <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =  moment(date).format('hh:mm a');
                  return days === 1 ? time  : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
           }
           </Container>

       </ThemeProvider>
    )
}
