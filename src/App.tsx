import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingIn from "./Pages/singIn/SingIn";
import { ProviderTheme, Dark } from "remoteApp/Hooks";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/Auth";
function App() {
  return (
    <ProviderTheme theme={Dark}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SingIn />} />
            <Route path="/:id?" element={<SingIn />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ProviderTheme>
  );
}

export default App;
