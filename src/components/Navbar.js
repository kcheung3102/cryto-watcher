import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import './Navbar.css';

export const Navbar = () => {
  return (
    <div>
      <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
          className="title"
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            CryptoWatcher
          </Typography>
          <Button color="inherit"> Login </Button>
        </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
