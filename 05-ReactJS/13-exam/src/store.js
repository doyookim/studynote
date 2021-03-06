import { configureStore } from "@reduxjs/toolkit";
import AccidentSlice from "./slices/AccidentSlice";

const store = configureStore({
  reducer: {
    accident: AccidentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
