import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../../../../MainCall/Auth";
import liff from "@line/liff";
import { GetdataAPI_Outside } from "../../../../MainCall/MainCall";

 const MainAuth = () => {
  const navigate = useNavigate();
  const [islogin, setislogin] = useState(true);

  useEffect(() => {
    if (liff.isInClient() === false) {
      Auth.CurrentUser().then((res) => {
        if (res === "") {
          setislogin(false);
          console.log("กรุณาล็อกอิน")
        } else {
          navigate("/");
          console.log("สำเร็จ")
        }
      });
    } else {
      Auth.LogOut();
      setislogin(false);
    }
  }, []);

  if (islogin) return;
  return (
    <>
      <div className="max-h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default MainAuth