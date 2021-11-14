import { Container, Typography } from "@mui/material";
import React from "react";
import "./Banner.css";
import { Carousal } from "../Carousal/Carousal";

export const Banner = () => {
  return (
    <div className="banner-image">
      <Container className="banner-content">
        <div className="tagline">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            {" "}
            Crypto Watcher{" "}
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "whitesmoke",
              textTransform: "capitalize",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousal />
      </Container>
    </div>
  );
};
