// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import system from "src/store/system";
import { all } from "redux-saga/effects";

// ** Saga
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    system,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleWare),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
