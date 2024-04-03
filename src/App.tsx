import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Suspense fallback={"Load"}>
      <h1>teste</h1>
    </Suspense>
  );
}

export default App;
