import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = {
  web: "https://dapi.kakao.com/v2/search/web",
  blog: "https://dapi.kakao.com/v2/search/blog",
  book: "https://dapi.kakao.com/v3/search/book",
  image: "https://dapi.kakao.com/v2/search/image",
  cafe: "https://dapi.kakao.com/v2/search/cafe",
};

const API_KEY = "9810b27a194332726987ea8f1fecd222";

export const getKakaoSearch = createAsyncThunk(
  "KakaoSlice/getKakaoSearch",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      result = await axios.get(API_URL[payload.api ? payload.api : "web"], {
        params: {
          query: payload.query,
          sort: payload.sort ? payload.sort : null,
          page: payload.page ? payload.page : 1,
          size: payload.size ? payload.size : 20,
        },
        headers: { Authorization: `KakaoAK ${API_KEY}` },
      });
    } catch (err) {
      result = rejectWithValue(err.response);
    }

    return result;
  }
);

const KakaoSlice = createSlice({
  name: "kakao",
  initialState: {
    meta: null,
    documents: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getKakaoSearch.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getKakaoSearch.fulfilled]: (state, { meta, payload }) => {
      return {
        meta: payload?.data.meta,
        documents:
          meta.arg.page > 1
            ? state.documents.concat(payload?.data?.documents)
            : payload?.data?.documents,
        loading: false,
        error: null,
      };
    },
    [getKakaoSearch.rejected]: (state, { payload }) => {
      return {
        meta: null,
        documents: null,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "ServerError",
        },
      };
    },
  },
});

export default KakaoSlice.reducer;