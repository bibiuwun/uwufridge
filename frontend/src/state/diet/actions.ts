import { createAsyncThunk } from "@reduxjs/toolkit";
import SnackbarUtils from "../../utils/SnackbarUtils";

export const GetDiet = createAsyncThunk(
  "diet/getDiet",
  async (
    {
      age,
      height,
      weight,
      activity_level,
      goal,
      sex,
      calorie_per_day
    }: {
      age: number;
      height: number;
      weight: number;
      activity_level: number;
      goal: string;
      sex: string;
      calorie_per_day: number;
    },
    thunkAPI
  ) => {
    try {
      const data = new URLSearchParams();
      data.append("age", age.toString());
      data.append("height", height.toString());
      data.append("weight", weight.toString());
      data.append("activity_level", activity_level.toString());
      data.append("goal", goal);
      data.append("sex", sex);
      data.append("calorie_per_day", calorie_per_day.toString());

      const macro_split = await fetch("/api/macro_split", {
        method: "POST",
        body: data,
      });
      if (macro_split.status !== 200) {
        SnackbarUtils.error(macro_split.statusText);
        return thunkAPI.rejectWithValue(macro_split.statusText);
      }

      const intake_lower = await fetch("/api/intake_lower", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });
      if (intake_lower.status !== 200) {
        SnackbarUtils.error(intake_lower.statusText);
        return thunkAPI.rejectWithValue(intake_lower.statusText);
      }

      const intake_upper = await fetch("/api/intake_upper", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });
      if (intake_upper.status !== 200) {
        SnackbarUtils.error(intake_upper.statusText);
        return thunkAPI.rejectWithValue(intake_upper.statusText);
      }

      return [
        await macro_split.json(),
        await intake_upper.json(),
        await intake_lower.json(),
      ];
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);
