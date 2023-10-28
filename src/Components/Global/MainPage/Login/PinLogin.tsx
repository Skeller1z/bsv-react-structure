import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckPin from "./CheckPin";

const PinLogin = () => {
  //--------ตัวแปร----------------------------
  interface LocationState {
    UserId: string;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //-------------onload-------------------------------------
  useEffect(() => {}, []);
  //------------------------------------------- funtion ------------------------------------------
  const returnpin = (data) => {
    if (data) {
      navigate("/Mobile");
    } else {
      alert("รหัสผ่านผิด");
    }
  };
  return (
    <>
      <div className="text-2xl text-center">Login</div>
      <div className="p-3">
        <CheckPin
          status={"login"}
          LineID={StateInterface.UserId}
          fn={returnpin}
        />
      </div>

      {/*  <label className="block text-sm font-medium text-blue-500 text-center hover:cursor-pointer mt-3">
        ลืมรหัสผ่าน
      </label> */}
    </>
  );
}

export default PinLogin