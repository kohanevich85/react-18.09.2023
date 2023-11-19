import {Provider} from "react-redux";
import {store} from "./store";
import React from "react";
import {ThemeProvider} from "./components/ThemeContext";
import {Home} from "./features/Home";
import {About} from "./features/About";
import {NotFound} from "./features/NotFound";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {WaiterApp} from "./features/Waiters";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Navigation} from "./components/Navigation";

export function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <Container maxWidth="md">
              <Stack spacing={2}>
                <AppBar position="static">
                  <Toolbar>
                    <Navigation/>
                  </Toolbar>
                </AppBar>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/waiter/*" element={<WaiterApp/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="*" element={<NotFound/>}/>
                </Routes>
              </Stack>
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
  );
}
