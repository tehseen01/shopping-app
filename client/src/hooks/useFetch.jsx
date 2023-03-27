import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchData = createAsyncThunk("products/fetch", async (url) => {
  const res = await axios.get(import.meta.env.VITE_API_URL + url);
  const data = await res.data.products;
  return data;
});
export const featureData = createAsyncThunk("feature/fetch", async (url) => {
  const res = await axios.get(import.meta.env.VITE_API_URL + url);
  const data = await res.data.products;
  return data;
});

export const singleFetch = createAsyncThunk("single/fetch", async (url) => {
  const res = await axios.get(url);
  const data = await res.data;
  return data;
});
