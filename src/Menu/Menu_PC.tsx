import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import List from "devextreme-react/list.js";
import { ReactComponent as UpimgIcon } from "../Assets/BSVAssets/GeneralAssets/SVG/Symbol.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { userdata } from "../Recoil/MainRecoil";
import { TopMenu_PC } from "../JSON/Menu_PC/Sidemenu";
export default function Menu_PC({ pageshow }) {
  //------------------------------------ตัวแปร---------------------------------------------
  
  const navigate = useNavigate();
  const [opened, setopened] = useState<boolean>(true);
  const [txtLogin, settxtLogin] = useState("");

  //------------------------------------onload---------------------------------------------

  //------------------------------------function---------------------------------------------

  const MenuItem = () => {
    return (
      <button type="button" className="">
        <UpimgIcon className="inline h-[auto] w-[30px] " />
      </button>
    );
  };

  const AboutItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8">About</div>
      </button>
    );
  };

  const TechItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("/Main/Cart")}>
          Cart
        </div>
      </button>
    );
  };

  const PriceItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("/Main/MyProfile")}>
          My Profile
        </div>
      </button>
    );
  };

  const ChatItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("/Main/Chat")}>
          Chat
        </div>
      </button>
    );
  };

  const LoginItem = () => {
    return (
      <button
        type="button"
        className={
          txtLogin === "LogOut"
            ? "btn-login px-6 "
            : "btn-login px-6 bg-red-500"
        }
      >
        {txtLogin}
      </button>
    );
  };

  //------------------------------------ HTML ---------------------------------------------
  return (
    <>
      <Toolbar>
        <Item location="center" render={MenuItem} />
        <Item location="center" render={AboutItem} />
        <Item location="center" render={TechItem} />
        <Item location="center" render={PriceItem} />
        <Item location="center" render={ChatItem} />
        <Item location="center" render={LoginItem} />
      </Toolbar>
      <Drawer
        opened={opened}
        openedStateMode="shrink"
        //position='left'
        //revealMode={revealMode}
        component={drawerComponentList}
        closeOnOutsideClick={false}
        height="auto"
      >
        <div id="content" className="dx-theme-background-color">
          <div className="grid grid-cols-12 bg-[#F6F9FF] sm:mb-16 lg:mb-0">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white min-h-[90vh]">
              {pageshow}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );

  function drawerComponentList() {
    return (
      <div className="list">
        <div className="list" style={{ width: "200px" }}>
          <List dataSource={TopMenu_PC} className="bg-fill" />
        </div>
      </div>
    );
  }
}
