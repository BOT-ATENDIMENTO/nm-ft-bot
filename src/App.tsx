import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingIn from "./Pages/singIn/SingIn";
import { ProviderTheme, Dark } from "remoteApp/Hooks";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Contexts/Auth";
import SignUp from "./Pages/SignUp";
import { Layout } from "./Layout";
function App() {
  return (
    <ProviderTheme theme={Dark}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/:id?" element={<SingIn />} />
          <Route path="/cadastrar" element={<SignUp />} />
          <Route path="/home" element={<Layout />} />
        </Routes>
      </AuthProvider>
    </ProviderTheme>
  );
}

export default App;
