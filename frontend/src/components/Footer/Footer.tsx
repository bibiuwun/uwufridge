import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Paper
        sx={{
          my: theme.spacing(2),
          padding: theme.spacing(2),
        }}
      >
        <Typography variant="body2" align="center">
          {"Copyright © "}
          uwufridge {new Date().getFullYear()}
          {". All Rights Reserved"}
        </Typography>
      </Paper>
    </React.Fragment>
  );
};

export default Footer;
