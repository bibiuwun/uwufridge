import { createReducer } from "@reduxjs/toolkit";
import { GetDiet } from "./actions";

export interface Diet {
  macro_split: {
    carb: number;
    fat: number;
    protein: number;
  };
  intake_lower: number;
  intake_upper: number;
  loading: string;
}

export const initialState: Diet = {
  macro_split: {
    carb: 0,
    fat: 0,
    protein: 0,
  },
  intake_lower: 0,
  intake_upper: 0,
  loading: "",
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(GetDiet.pending, (state) => {
      state.loading = "loading";
    })
    .addCase(GetDiet.fulfilled, (state, action) => {
      if (state.loading === "loading") {
        state.loading = "idle";
        if (action.payload) {
          state.macro_split = action.payload[0];
          state.intake_upper = action.payload[1].calorie;
          state.intake_lower = action.payload[2].calorie;
        }
      }
    })
    .addCase(GetDiet.rejected, (state, action) => {
      if (!action.meta.aborted) {
        state.loading = "error";
      }
    });
});
