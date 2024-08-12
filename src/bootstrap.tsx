import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Dark, ProviderTheme } from "remoteApp/Hooks";
import App from "./App";
import { AuthProvider } from "./Contexts/Auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ProviderTheme theme={Dark}>
        <App />
      </ProviderTheme>
    </AuthProvider>
  </BrowserRouter>
);
