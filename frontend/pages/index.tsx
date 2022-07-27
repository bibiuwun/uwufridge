import { Container, Grid, Paper, Typography, useTheme } from "@mui/material";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Container
        sx={{
          my: 5,
        }}
        maxWidth="lg"
      >
        <Paper
          sx={{
            padding: theme.spacing(3, 2),
          }}
          elevation={3}
        >
          <Typography variant="h4" align="center">
            Welcome to uwufridge!
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Home;