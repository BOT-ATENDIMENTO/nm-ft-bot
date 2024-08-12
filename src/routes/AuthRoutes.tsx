import { Route, Routes } from "react-router-dom";

import SignUp from "../pages/signUp/SignUp";
import SignIn from "../pages/singIn/SingIn";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}
