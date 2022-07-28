import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { loginRequest } from "../src/state/authentication/actions";
import { useIsAuthenticated } from "../src/state/authentication/hooks";
import { useAppDispatch } from "../src/state/hooks";

const Login: NextPage = () => {
  const theme = useTheme();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  const handleLogin = () => {
    dispatch(
      loginRequest({
        code: "",
        state: "",
      })
    );
  };

  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 5,
        }}
      >
        <Paper
          sx={{
            padding: theme.spacing(3, 2),
          }}
          elevation={3}
        >
          <Typography variant="h4" align="center">
            Login
          </Typography>
        </Paper>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            padding: theme.spacing(3, 2),
            justifyContent: "center",
          }}
        >
          <Grid item>
            <Paper
              sx={{
                padding: theme.spacing(1, 1),
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                sx={{
                  padding: theme.spacing(1, 1),
                }}
                variant="outlined"
                onClick={() => handleLogin()}
              >
                Login
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Login;
