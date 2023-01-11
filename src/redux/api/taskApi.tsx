import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "./authApi";

export const taskApi = createApi({
  reducerPath: "taskAuthApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Todo", "Comment"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
