import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AuthModal } from "../../auth/AuthModal";
import './Navbar.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CryptoState } from "../../CryptoContext";

export const Navbar = () => {

const { currency, setCurrency } = CryptoState();

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
        mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
           className="title"
            variant="h6"
            component="div"
          >
            CryptoWatcher
          </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="currency"
          onChange={handleChange}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"JPY"}>JPY</MenuItem>
        </Select>
          <AuthModal />
        </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
