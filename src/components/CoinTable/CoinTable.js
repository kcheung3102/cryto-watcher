import React, { useState, useEffect } from "react";
import { Search } from "../Search/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

export const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  

  const formatSparkLine = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix();
    let formattedSparkline = numbers.map((item, index) => {
      return {
        x: sevenDaysAgo + (index + 1) * 3600,
        y: item
      }
    });
    return formattedSparkline;
  }

  const formatMarketData = (data) => {
    let formattedData = [];
    data.forEach(item => {
      const formattedSparkline = formatSparkLine(item.sparkline_in_7d.price);

      const formattedItem = {
        ...item,
        sparkline_in_7d: {
          price: formattedSparkline
        }
      }

      formattedData.push(formattedItem);
    });

    return formattedData;
  }

  const handleSearch = () => {
    //filters out the coins state on key press or on search click
    return coins.filter((coin) => {
      coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search);
    });
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const fetchCoinsList = async () => {
    const response = await fetch(CoinList(currency));

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    const formattedResponse = formatMarketData(data);
    setCoins(formattedResponse);
    setLoading(true);
  };
  console.log(coins);
  console.log(coins.map((coin) => {
    return coin.price_change_percentage_24h;
  }))


  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

  const formatNumber = (x) => {
    if(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else 
    return null;
  };

  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        },
      },
      y:{
        ticks: {
          display: false
        },
        grid: {
          display: false
        },
      },
    },
    plugins: {
      legend: {
        display: false
      }
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Search  onChange={(e) => setSearch(e.target.value)}/>
      </Container>
      <Container>
        <Grid item xs={12}>
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Ranking</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>Percent Change</TableCell>
                <TableCell>Market Cap</TableCell>
                <TableCell>Last 7 Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.market_cap_rank}
                    </TableCell>
                    <TableCell
                      component={Link}
                      to={`/coins/${row.id}`}
                      scope="row"
                    >
                      <img src={row.image} style={{ height: 40 }} />
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      {symbol}
                      {row.current_price}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {row?.price_change_percentage_24h?.toFixed(2)}
                      %
                    </TableCell>
                    <TableCell align="right">
                      {symbol}
                      {formatNumber(row.market_cap)}
                    </TableCell>
                    <TableCell>
                      { !coins ? 
                      <CircularProgress
                      style={{ color: "gold" }}
                      size={150}
                      thickness={1}
                    /> :
                        <Line data={{
                            labels: row.sparkline_in_7d.price.map((data) => {
                              let date = new Date(data.x*1000)
                              let formattedDate = moment(date).format("MM/DD/YYYY HH:mm");
                              return formattedDate;
                            }
                            ),
  
                            datasets: [
                              {
                                data: row.sparkline_in_7d.price.map((data) => data.y),
                                label: 'Price',
                                borderColor: "#EEBC1D",
                              }
                            ]
                        }}
                        options={options}
                        />

                      }
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
