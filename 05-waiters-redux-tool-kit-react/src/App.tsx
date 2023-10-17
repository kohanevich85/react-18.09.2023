import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import {WaiterApp} from "./features/Waiters";

export function App() {
  return (
    <Provider store={store}>
        <WaiterApp />
    </Provider>
  );
}
