// actions/roles.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../constants/api_routes";



export const createRole = createAsyncThunk(
  "roles/createRole",
 async ({ payload, token }: any, thunkAPI) => {
     try {
       const response = await axios.post(
         apiRoutes.createRole,
         payload,
         {
           headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
           },
         }
       );
       return response.data;
     } catch (error: any) {
       console.error("Backend Error:", error.response?.data || error.message);
       return thunkAPI.rejectWithValue(error.response?.data);
     }
   }
 );

 export const getRoles = createAsyncThunk(
   'Rples/getRoles',
   async ({ token }: any, thunkAPI) => {
      try {
        const response = await axios.get(
          apiRoutes.getRole,
          {
            headers: {
              Authorization: `Bearer ${token}`
              
            },
          }
        );
        return response.data;
      } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  );