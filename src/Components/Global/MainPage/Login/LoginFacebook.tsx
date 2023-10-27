import { useRef, useState, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import FacebookLogin from "react-facebook-login";
import Cookies from "universal-cookie";

import { GetdataAPI, GetdataAPI_Outside } from "../../../../MainCall/MainCall";
import Auth from "../../../../MainCall/Auth";
import auhv from "../../../../MainCall/auhv.json";
import { MsgWarning } from "../../../../MainCall/dialog";
import { useTranslation } from "react-i18next";
import liff from "@line/liff/dist/lib";
interface LocationState {
  UserId: string;
  uri: string;
  displayName: string;
  inv_id: number;
  email: string;
}
export default function LoginFacebook(prop) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [picture, setpicture] = useState("");
  const { AuthenticateLine } = auhv;
  const [loginType, setloginType] = useState("");
  const { Authenticate } = auhv;
  const { AuthenticateFacebook } = auhv;
  const componentClckked = () => {
    console.log("clicked");
  };

  const AddLine_WITH_Redirect = (UserLineId, uri) => {
    GetdataAPI_Outside("/api/Main/CheckUserLineId", {
      User_line_userid: UserLineId,
    }).then((res) => {
      if (res.Status === "Success") {
        if (res.Data === "False") {
          GetdataAPI("/api/Main/SaveDataUserLineId", {
            User_line_userid: UserLineId,
          }).then(async (res) => {
            if (res.Status === "Success") {
              if (uri === undefined) {
                navigate("/");
              } else {
                window.location.href = uri;
              }
            } else {
              MsgWarning(t("failure"));
            }
          });
        } else {
          if (uri === undefined) {
            navigate("/");
          } else {
            window.location.href = uri;
          }
        }
      }
    });
  };

  const responseFacebook = (response) => {
    if (response.id === undefined) {
      //MsgWarning(t("Plese Login"));
      return;
    } else {
      setIsLoggedIn(true);
      setuserId(response.id);
      setname(response.name);
      setemail(response.email);
      setpicture(response.picture);
      console.log(response);
      console.log(response.id);

      console.log(response.email);
      const UserId = response.id;
      const email = response.email;
      const displayName = response.name;
      GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
        authen_code: UserId,
        platform_name: "fbauthen",
      }).then((res) => {
        if (res.Status === "Success") {
          if (res.Data === "True") {
            Auth.Login(AuthenticateFacebook, UserId, "000000").then((res) => {
              if (res.Status === "Success") {
                navigate("/");
              }
            });
          } else {
            GetdataAPI_Outside("/api/Main/Register", {
              PhoneNumber: "",
              UserName: UserId,
              Password: "000000",
              Email: email,
              User_Name: displayName,
            }).then((Register) => {
              if (Register.Status === "Success") {
                Auth.Login(Authenticate, UserId, "000000").then((res) => {
                  if (res.Status === "Success") {
                    navigate("/");
                    GetdataAPI("/api/Main/SaveAuthenCode", {
                      authen_code: UserId,
                      platform_name: "fbauthen",
                    }).then((res) => {});
                  }
                });
              }
            });
          }
        } else {
          MsgWarning(res.Message);
        }
      });
    }
  };

  const SaveUserId = () => {
    GetdataAPI("/api/Main/SaveAuthenCode", {
      authen_code: "1846159219085487",
      platform_name: "fbauthen",
    }).then((res) => {
      console.log(res);
    });
  };

  const CheckUserId = () => {
    GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
      authen_code: userId,
      platform_name: "fbauthen",
    }).then((res) => {
      console.log(res.Data);
      if (res.Data === "True") {
        alert("aa");
      }
    });
  };

  return (
    <div className="grid grid-cols-12 ">
      <div className="grid col-span-12 content-start  w-full">
        <FacebookLogin
          appId="1379430779515952"
          autoLoad={false}
          fields="name,email,picture"
          onClick={componentClckked}
          callback={responseFacebook}
          isSignedIn={false}
          textButton={"Login with Facebook"}
          size="medium"
          icon="fa-facebook"
        ></FacebookLogin>
      </div>
    </div>
  );
}
