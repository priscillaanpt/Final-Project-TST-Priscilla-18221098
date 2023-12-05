import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Routes from "./routes/routes";

function App() {
  return (
    <NextUIProvider>
      <Routes />
    </NextUIProvider>
  );
}

export default App;
