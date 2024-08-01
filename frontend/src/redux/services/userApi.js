import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setIsAuthenticated, setIsLoading, setUser } from "../features/userSlice";

const baseUrl = process.env.REACT_APP_API_URL || "/api/v1";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) =>({
    getCurrentUser: builder.query({
      query: () => "/me",
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }){
        try{
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setIsLoading(false));
        }
        catch(error){
          dispatch(setIsLoading(false));
          console.log(error);
        }
      }
    })
  })
});

export const { useGetCurrentUserQuery } = userAPI;