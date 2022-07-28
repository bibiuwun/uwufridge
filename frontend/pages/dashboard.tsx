import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useIsAuthenticated } from "../src/state/authentication/hooks";
import { GetDiet } from "../src/state/diet/actions";
import { useDiet } from "../src/state/diet/hooks";
import { useAppDispatch } from "../src/state/hooks";

const Dashboard: NextPage = () => {
  const theme = useTheme();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState<any>();
  const diet = useDiet();
  const dispatch = useAppDispatch();

  if (!isAuthenticated) {
    router.push("/login");
  }

  useEffect(() => {
    if (diet.loading === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [diet]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setForm({ ...form, [id]: value });
  };

  const handleSelect = (event: SelectChangeEvent<any>, id: string) => {
    setForm({ ...form, [id]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      GetDiet({
        ...form,
      })
    );
  };

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
        <form onSubmit={handleSubmit}>
          <Container maxWidth="md">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xl: 2 }}
              sx={{ py: theme.spacing(2) }}
            >
              <Grid item xl={1}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="age">Age</InputLabel>
                  <Input
                    id="age"
                    required
                    onChange={handleChange}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={1}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="sex">Sex</InputLabel>
                  <Select
                    id="sex"
                    required
                    onChange={(e) => handleSelect(e, "sex")}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xl={1}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="height">Height in Inches</InputLabel>
                  <Input
                    id="height"
                    required
                    onChange={handleChange}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={1}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="weight">Weight in Lbs</InputLabel>
                  <Input
                    id="weight"
                    required
                    onChange={handleChange}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={1}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="calorie_per_day">
                    Calorie per Day
                  </InputLabel>
                  <Input
                    id="calorie_per_day"
                    required
                    onChange={handleChange}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={1}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="goal">Goal</InputLabel>
                  <Select
                    id="goal"
                    required
                    onChange={(e) => handleSelect(e, "goal")}
                  >
                    <MenuItem value="fat_loss">Fat Loss</MenuItem>
                    <MenuItem value="maintain">Maintain</MenuItem>
                    <MenuItem value="bulk">Bulk</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xl={1}>
                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="activity_level">
                    Activity Level
                  </InputLabel>
                  <Select
                    id="activity_level"
                    required
                    onChange={(e) => handleSelect(e, "activity_level")}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xl={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LoadingButton loading={loading} type="submit">
                    Submit
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </form>

        <Container maxWidth="md">
          <Grid
            container
            columns={{
              xl: 3,
            }}
            sx={{
              py: theme.spacing(2),
            }}
          >
            <Grid item xl={1}>
              Carb: {diet.macro_split.carb} g
            </Grid>
            <Grid item xl={1}>
              Fat: {diet.macro_split.fat} g
            </Grid>
            <Grid item xl={1}>
              Protein: {diet.macro_split.protein} g
            </Grid>
            <Grid item xl={1}>
              Intake Upper: {diet.intake_upper} calories
            </Grid>
            <Grid item xl={1}>
              Intake Lower: {diet.intake_lower} calories
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
