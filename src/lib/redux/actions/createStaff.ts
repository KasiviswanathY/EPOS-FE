// actions/roles.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../constants/api_routes";



export const createstaff = createAsyncThunk(
  "staff/createStaff",
 async ({ payload, token }: any, thunkAPI) => {
     try {
       const response = await axios.post(
         apiRoutes.createStaffs,
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

 export const getStaff = createAsyncThunk(
   'staff/getStaff',
   async ({ token }: any, thunkAPI) => {
      try {
        const response = await axios.get(
          apiRoutes.getStaffs,
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


  export const updateStaff = createAsyncThunk(
    'staff/updateStaff',
    async ({id, payload, token }: any, thunkAPI) => {
      try {
        const response = await axios.patch(
          apiRoutes.updateStaffs(id),
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
  export const deletStaff = createAsyncThunk(
    'staff/deletStaff',
     async ({id,  token }: any, thunkAPI) => {
      try {
        const response = await axios.delete(
          apiRoutes.deleteStaffs(id),
  
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