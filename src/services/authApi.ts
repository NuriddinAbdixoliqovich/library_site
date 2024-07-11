import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3006",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { userName: string; password: string }) => {
        return {
          url: "/myself",
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: {
        firstName: string;
        email: string;
        userName: string;
        password: string;
      }) => {
        return {
          url: "/signup",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
