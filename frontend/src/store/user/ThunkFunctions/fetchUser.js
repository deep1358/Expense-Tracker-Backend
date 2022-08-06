import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const res = await axios.get("/auth/user");
    return res.data;
  } catch (err) {
    return error(err);
  }
});
