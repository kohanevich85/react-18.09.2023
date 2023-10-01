import React from 'react';
import ReactDOM from 'react-dom/client';
import {WaiterApp} from "./features/waiters";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<WaiterApp/>);
