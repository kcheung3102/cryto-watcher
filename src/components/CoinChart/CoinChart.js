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

export const CoinChart = ({coin}) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency, symbol } = CryptoState(); 

    const fetchChartData = async() => {
        const response = await fetch(HistoricalChart(coin.id, days, currency));
         const data = await response.json();
         console.log(data);
         setHistoricalData(data.prices);
    };


    useEffect(() => {
        fetchChartData();
        xAxisData();
    }, []);

    const xAxisData = () => {
        historicalData.map((coin) => {
            let date = new Date(coin[0]);
            console.log(date)
        });
    }


     console.log(historicalData);

    return (
        <div>
    
        </div>
    )
}
