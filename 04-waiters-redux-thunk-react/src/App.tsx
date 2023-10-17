import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import {WaiterApp} from "./features/waiters";

export function App() {
  return (
    <Provider store={store}>
        <WaiterApp />
    </Provider>
  );
}
