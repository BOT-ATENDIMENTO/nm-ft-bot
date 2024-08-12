import { Route, Routes } from "react-router-dom";
import { Header, SiderBar } from "remoteApp/Components";

import { Content } from "remoteApp/Components";
import { Bot } from "../pages/bots/Bots";
import { Home } from "../pages/home/Home";
import { FluxoBot } from "../pages/fluxoBot/FluxoBot";

export function AppRoutes() {
  return (
    <>
      <SiderBar>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bots" element={<Bot />} />
            <Route path="/fluxo-bot/:token" element={<FluxoBot />} />
          </Routes>
        </Content>
      </SiderBar>
    </>
  );
}
