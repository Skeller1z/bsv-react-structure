import React, { useRef, useState, useEffect } from "react";
import { PinInput } from "react-input-pin-code";
import { useNavigate } from "react-router-dom";
import Auth from "../../../../MainCall/Auth";
import auhv from "../../../../MainCall/auhv.json";
import { ReactComponent as Logo } from "../../../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { GetdataAPI } from "../../../../MainCall/MainCall";
export default function CheckPin(props) {
  const { AuthenticateLine } = auhv;
  const navigate = useNavigate();
  const [Pin, setPin] = useState("");
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  return (
    <>
      <div className="mx-2">
        <div className="grid grid-cols-12 gap-3 mt-16">
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5">
            <Logo className="inline h-[auto] w-[60px] center" />
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              PINCODE
            </div>
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              ยืนยันรหัสอีกครั้ง
            </div>
          </div>
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <PinInput
              values={values}
              autoFocus={true}
              mask
              placeholder="_"
              inputStyle={{ width: "45px" }}
              onChange={(value, index, values) => {
                let valpin = [];
                return setValues(values), (valpin[index] = value);
              }}
              onComplete={(valpin) => {
                setValues(["", "", "", "", "", ""]);
                if (props.status === "login") {
                  Auth.Login(
                    AuthenticateLine,
                    props.LineID,
                    valpin.join("")
                  ).then((res) => {
                    if (res !== undefined && !("error" in res)) {
                      if (window.innerWidth < 992) {
                        navigate("/Mobile");
                      } else {
                        navigate("/");
                      }
                    } else {
                      alert("รหัสผิด");
                    }
                  });
                } else {
                  setPin(valpin.join(""));
                  GetdataAPI("/api/Main/CheckPinTrueOrFalse", {
                    user_pin: valpin.join(""),
                  }).then(async (res) => {
                    if (res.Status === "failure") {
                      return;
                    }
                    if (res.Status.trim() === "Success") {
                      props.fn(true);
                    } else if (res.Status.trim() === "Err") {
                      alert("รหัสผิด");
                    }
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
