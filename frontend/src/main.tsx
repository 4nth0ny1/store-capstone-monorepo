import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/rootReducer.ts";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import StyleWrapper from "./components/StyleWrapper.tsx";

const store = configureStore({ reducer: rootReducer });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StyleWrapper>
          <Navbar />
          <App />
        </StyleWrapper>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
