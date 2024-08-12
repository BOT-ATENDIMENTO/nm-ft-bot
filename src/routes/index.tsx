import { useAuth } from "../Contexts/Auth";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";

export function RoutesPages() {
  const { user } = useAuth();
  console.log("user", user);
  if (user.id) {
    return <AppRoutes />;
  } else {
    return <AuthRoutes />;
  }
}
