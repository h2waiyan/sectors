import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUsers } from "./entry_slice";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getEntries: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            getUsers({
              data: result.data,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    addEntry: builder.mutation({
      query: (body) => ({
        url: "todos",
        method: "POST",
        body,
      }),
    }),
    editEntry: builder.mutation({
      query: ({ id, body }) => ({
        url: `todos/${id}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetEntriesQuery, useAddEntryMutation, useEditEntryMutation } =
  api;
