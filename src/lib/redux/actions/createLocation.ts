import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../constants/api_routes";

import { deleteLocationSuccess, updateLocationSuccess } from "@/lib/redux/slices/authSlice";

export const createLocations = createAsyncThunk(
  "location/createLocations",
  async ({ payload, token }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        apiRoutes.createLocation,
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


export const getLocations = createAsyncThunk(
  "locations/getLocations",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const res = await axios.get(
       apiRoutes.getLocations,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // If backend returns an array, take the first
     return Array.isArray(res.data) ? res.data : [res.data];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async ({id, payload, token }: any, thunkAPI) => {
    try {
      const response = await axios.patch(
        apiRoutes.updateLocations(id),
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
        thunkAPI.dispatch(updateLocationSuccess(response.data));
      return response.data;
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  'location/deleteLocation',
   async ({id,  token }: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        apiRoutes.deleteLocations(id),

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
       thunkAPI.dispatch(deleteLocationSuccess(response.data));
      return response.data;
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);