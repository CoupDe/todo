import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ISortedQuerys,
  IFilteredQuerys,
  ITask,
} from "../../typeinterfaces/types";
type Initial = {
  taskList: ITask[];
};
const initialState: ISortedQuerys & IFilteredQuerys & Initial = {
  filterValues: [],
  sortedQuery: "created",
  taskList: [],
};
const viewTaskSlice = createSlice({
  name: "viewTaskSlice",
  initialState,
  reducers: {
    getFilterValue: (state, action: PayloadAction<IFilteredQuerys>) => {
      console.log("action filter", action.payload.filterValues);
      state.filterValues = action.payload.filterValues;
    },
    getSortedValue: (state, action: PayloadAction<string>) => {
      console.log("action sorted", action.payload);
      state.sortedQuery = action.payload;
    },
    getTask: (state, action: PayloadAction<ITask[]>) => {
      // console.log("getTaskSLICE", action.payload);
      state.taskList = action.payload;
    },
  },
});
export const { getFilterValue, getSortedValue, getTask } =
  viewTaskSlice.actions;
export default viewTaskSlice;
