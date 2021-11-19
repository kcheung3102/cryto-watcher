import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

export const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();


  const handleSearch = () => {
    //filters out the coins state on key press or on search click

    return coins.filter((coin) => {
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    }
    );
  }

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
    setCoins(data);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoinsList();
  }, [currency]);

  

  const formatNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };



  return (
    <ThemeProvider theme={darkTheme}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Percent Change</TableCell>
            <TableCell align="right">Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.market_cap_rank}
              </TableCell>
              <TableCell component="th" scope="row">
              <img src={row.image} style={{ height: 40 }} />{row.name}
              </TableCell>
              <TableCell align="right">{row.current_price}</TableCell>
              <TableCell align="right">
                {formatNumber(row.price_change_percentage_24h.toFixed(2))}
              </TableCell>
              {/* {/* <TableCell align="right">{row.carbs}</TableCell> */}
              <TableCell align="right">{symbol}{formatNumber(row.market_cap)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
};
