import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CoinList } from "../../config/api";
import { HistoricalChart } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBar from "material-ui-search-bar";
import moment from "moment";

export const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredCoins,setFilteredCoins] = useState([]);
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

  const handleSearch = searchItem => {
    if(searchItem.length > 0 && searchItem !== "") {
    const newResults = coins.filter(coin => coin.name.toLowerCase().includes(searchItem));
    console.log("new Results", newResults);
    setFilteredCoins(newResults);
    } 
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
    setFilteredCoins(formattedResponse);
  };
  console.log(coins);
  console.log(filteredCoins);


  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

  const formatNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      <Grid>
        <SearchBar value={searchItem} onChange={ value => setSearchItem(value) } onRequestSearch={ searchItem =>  handleSearch(searchItem)}/>
      </Grid>
      <Grid>
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
              {filteredCoins.map((row) => {
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
                      {
                        row?.price_change_percentage_24h?.toFixed(2)
                      }
                      %
                    </TableCell>
                    <TableCell align="right">
                      {symbol}
                      {formatNumber(row.market_cap)}
                    </TableCell>
                    <TableCell>
                      <Line  data={{
                          labels: row?.sparkline_in_7d.price.map((data) => {
                            let date = new Date(data.x*1000)
                            let formattedDate = moment(date).format("MM/DD/YYYY HH:mm");
                            return formattedDate;
                          }
                          ),

                          datasets: [
                            {
                              data: row?.sparkline_in_7d.price.map((data) => data.y),
                              label: 'Price',
                              borderColor: "#EEBC1D",
                            }
                          ]
                      }}
                      options={options}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
