import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingIn from "./Pages/singIn/SingIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SingIn />} />
        <Route path="/:id?" element={<SingIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
