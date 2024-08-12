import { Header, SiderBar } from "remoteApp/Components";
import { LayoutContent } from "./Content/Index";

export const Layout = () => {
  return (
    <div>
      <SiderBar>
        <Header />
        <LayoutContent />
      </SiderBar>
    </div>
  );
};
