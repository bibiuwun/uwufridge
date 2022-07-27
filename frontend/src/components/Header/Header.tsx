import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LoginIcon from "@mui/icons-material/Login";
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import React from "react";

interface Props {
  toggleColorMode: () => void;
  router: NextRouter;
}

const Header: React.FC<Props> = (props: Props) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Head>
        <title>uwufridge</title>
      </Head>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1, cursor: "pointer", paddingLeft: 1 }}
            variant="h4"
            onClick={() => props.router.push("/")}
          >
            uwufridge
          </Typography>
          <Tooltip title="Dark Mode">
            <IconButton color="inherit" onClick={props.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Tooltip>
          <IconButton color="inherit">
            <Link href="/login">
              <Tooltip title="Login">
                <LoginIcon />
              </Tooltip>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withRouter(Header);
