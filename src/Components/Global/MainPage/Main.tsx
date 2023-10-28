import { useNavigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Islogin,
  OnlineFace,
  OnlineRec,
  UserState,
  userWebdata,
  userdata,
} from "../../../Recoil/MainRecoil";

import { Toast } from "devextreme-react";
import Auth from "../../../MainCall/Auth";
import PopupPDPA from "../Popup/PopupPDPA";

interface ToasttypeFace {
  type?: "custom" | "error" | "info" | "success" | "warning";
}
export default function Main() {
  //------------------------ตัวแปร-----------------------------
  const [Online, setOnline] = useRecoilState<OnlineFace>(OnlineRec);
  const navigate = useNavigate();
  const [islogin, setislogin] = useRecoilState(Islogin);
  const [ToastVisible, setToastVisible] = React.useState(false);
  const [ToastType, setToastType] = React.useState<ToasttypeFace>({
    type: "info",
  });
  const [Toastmessage, setToastmessage] = React.useState("");

  const [popup, setpopup] = React.useState(false);
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  //------------------------onload----------------------------
  useEffect(() => {
    if (localStorage.getItem("chk") !== "0") {
      setpopup(true);
    }
    const uri = window.location.href;

    Auth.RefreshDataUser().then((res) => {
      if (res.Status === "Unauthorized") {
        navigate("/Authen", {
          state: {
            uri: uri,
          },
        });
      } else {
        setislogin(true);
      }
    });

    window.addEventListener("offline", fnsetOffline);
    window.addEventListener("online", fnsetOnline);
    return () => {
      window.removeEventListener("offline", fnsetOffline);
      window.removeEventListener("online", fnsetOnline);
    };
  }, []);

  useEffect(() => {
    if (Online.isOnline === true && Online.Prev === false) {
      setToastVisible(true);
      setToastType({ type: "success" });
      setToastmessage("Online");
    } else if (Online.isOnline === false) {
      setToastVisible(true);
      setToastType({ type: "error" });
      setToastmessage("Offline");
    }
  }, [Online]);

  //------------------------function--------------------------
  const fnsetOnline = () => {
    setOnline({ isOnline: true, Prev: false });
  };
  const fnsetOffline = () => {
    setOnline({ isOnline: false, Prev: true });
  };

  function onHiding(e) {
    if (Online.isOnline === true) {
      setToastVisible(false);
    } else {
      e.cancel = true;
    }
  }
  const toggle = () => {
    setpopup(!popup);
  };

  //------------------------HTML------------------------------
  if (!islogin) return;
  return (
    <>
      <Toast
        animation={{
          show: { type: "fade", duration: 400, from: 0, to: 1 },
          hide: { type: "fade", duration: 1000, from: 1, to: 0 },
        }}
        position={{
          my: { x: "center", y: "top" },
          at: { x: "center", y: "top" },
          of: window,
          offset: "0 10",
        }}
        visible={ToastVisible}
        message={Toastmessage}
        type={ToastType.type}
        onHiding={onHiding}
        displayTime={600}
      />
      <div className="max-h-screen">
        <div className={popup ? "" : "hidden"}>
        <PopupPDPA toggle={popup} fntoggle={toggle} />
        </div>
        <div className={popup ? "hidden" : ""}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
