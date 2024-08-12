import "react-toastify/dist/ReactToastify.css";

import { Header, SiderBar } from "remoteApp/Components";
import { Bot } from "./pages/bots/Bots";

import { Content } from "remoteApp/Components";

import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { RoutesPages } from "./routes";
function App() {
  // return <RoutesPages />;
  return (
    // <SiderBar>
    //   <Header />
    //   <Content>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/bots" element={<Bot />} />
    //     </Routes>
    //   </Content>
    // </SiderBar>
    <RoutesPages />
  );
}

export default App;
