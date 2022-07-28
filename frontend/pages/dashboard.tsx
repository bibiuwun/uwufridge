import { Container, Paper, Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useIsAuthenticated } from "../src/state/authentication/hooks";

const Dashboard: NextPage = () => {
  const theme = useTheme();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
  }

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Paper
          sx={{
            padding: theme.spacing(3, 2),
            mt: 3,
          }}
          elevation={3}
        >
          <Typography variant="h4" align="center">
            Dashboard
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
