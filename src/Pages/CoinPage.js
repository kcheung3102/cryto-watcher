import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CoinChart } from "../components/CoinChart/CoinChart";

export const CoinPage = () => {
    //pass in the coins id by grabbing it from the query string 
    // next call the api for a single coin and then pass through the api 
    // set state for the currency and symbol using context api
        const { id } = useParams();
        const [coin, setCoin] = useState();

          const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
        mode: "dark",
    },
  });

        const fetchCoin = async() => {
            const response = await fetch( SingleCoin(id));

            const data = await response.json();

            console.log(data);

            setCoin(data);
        };


useEffect(() => {
    fetchCoin();
},[]);


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <ThemeProvider theme={darkTheme}>

         <Card>
         <img   
         height="100"
         src={coin?.image.large}
         alt={coin?.name}
         />
         <CardContent>
            <Typography variant="h5" component="div">
                {coin?.name}
            </Typography>
              <Typography variant="body2" color="text.secondary">
          {coin?.description.en.split(". ")[0]}
        </Typography>
         </CardContent>
         </Card>
         <CoinChart  coin={coin}/>
        </ThemeProvider>
    )
}
