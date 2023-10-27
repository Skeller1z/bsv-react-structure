import React, { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Auth from "../../../../MainCall/Auth";
import { useTranslation } from "react-i18next";
import { ReactComponent as UpimgIcon } from "../../../../Assets/BSVAssets/GeneralAssets/SVG/Symbol.svg";
import { ReactComponent as Line } from "../../../../Assets/BSVAssets/Login/line-brands.svg";
import { GetdataAPI, GetdataAPI_Outside } from "../../../../MainCall/MainCall";
import '../../../../css/OR.css'
import auhv from "../../../../MainCall/auhv.json";
import { MsgWarning } from "../../../../MainCall/dialog";
import liff from "@line/liff";
import LoginFacebook from "./LoginFacebook";
import Google_login from "./Google_login";
import LineLogin from "./LineLogin";
import Loading from "../../Loading/LoadingPage";
const { Authenticate, AuthenticateLine } = auhv;

 const Login = () => {
  //------------------------ตัวแปร-----------------------------
  const btnlogin = useRef(null);
  const Username = useRef(null);
  const Password = useRef(null);
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  interface LocationState {
    UserId: string;
    uri: string;
  }
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [noti, setnoti] = useState<boolean>(false);
  const [IDLine, setIDLine] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const LineLogin = searchParams.get("line");
  const [OpenLine, setOpenLine] = useState(false);
  const [LoadingLine, setLoadingLine] = useState(false);
  const params = searchParams.get("logout");
  const URL = StateInterface?.uri;
  const params_slist_id = searchParams.get("slist_id");
  const params_parentcomp_id = searchParams.get("parentcomp_id");

  //-------------------------- onload --------------------------
  useEffect(() => {}, []);

  useEffect(() => {
    checkLineAppOpen();
    console.log(URL)
  }, []);

  const test = [
    {
      comp_id: 12,
      deposit: 0,
      discount: 0,
      grand_total: 1,
      item_discount: 0,
      item_id: 74345,
      ms_id: 62835,
      order_date: "2023-06-13T00:00:00",
      order_id: 6264,
      order_item_id: 6497,
      order_no: "SO6606-0105",
      partner_id: 7110,
      qty: 1,
      remark: null,
      total: 1,
      unit_price: 1,
      unitid: 3,
    },
  ];

  //------------------------function--------------------------
  const login = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (Username.current.instance.option("value") === "") {
      Username.current.instance.focus();
      return;
    }
    if (Password.current.instance.option("value") === "") {
      Password.current.instance.focus();
      return;
    }
    Auth.Login(
      Authenticate,
      Username.current.instance.option("value"),
      Password.current.instance.option("value")
    ).then((res) => {
      if (res.Status === "Success") {
        if (StateInterface === null) {
          if (liff.isInClient()) {
            liff.getProfile().then((profile) => {
              AddLine_WITH_Redirect(profile.userId, undefined);
            });
          } else {
            navigate("/main");
          }
        } else if (StateInterface.UserId === undefined) {
          if (liff.isInClient()) {
            liff.getProfile().then((profile) => {
              AddLine_WITH_Redirect(profile.userId, StateInterface?.uri);
            });
          } else {
            if (StateInterface?.uri === undefined) {
              navigate("/");
            } else {
              window.location.href = StateInterface?.uri;
            }
          }
        } else {
          AddLine_WITH_Redirect(StateInterface.UserId, StateInterface?.uri);
        }
      } else {
        Password.current.instance.option("value", "");
        Password.current.instance.focus();
        setnoti(true);
      }
    });
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
  const ToSignUp = () => {
    navigate("../SignUp");
  };
  const ToForgotpass = () => {
    navigate("../Forgotpass");
  };
  const LINE = () => {
    if (liff.isInClient()) {
      liff.getProfile().then((profile) => {
        const UserId = profile.userId;
        GetdataAPI_Outside("/api/Main/CheckUserLineId", {
          User_line_userid: UserId,
        }).then((res) => {
          if (res.Status === "Success") {
            if (StateInterface === null) {
              if (res.Data === "True") {
                navigate("/MobileAuth/LineLogin", {
                  state: {
                    UserId: UserId,
                  },
                });
              } else {
                navigate("/MobileAuth/SignUp", {
                  state: {
                    UserId: UserId,
                  },
                });
              }
            } else {
              if (res.Data === "True") {
                navigate("/MobileAuth/LineLogin", {
                  state: {
                    UserId: UserId,
                    uri: StateInterface?.uri,
                  },
                });
              } else {
                navigate("/MobileAuth/SignUp", {
                  state: {
                    UserId: UserId,
                    uri: StateInterface?.uri,
                  },
                });
              }
            }
          }
        });
      });
    } else {
      navigate("/LineAuthen");
    }
  };

  const lineAuth = () => {
    liff
      .init({
        liffId: "2000436952-PpzaXXN2", // Use own liffId
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          if (StateInterface === null) {
            liff.login({ redirectUri: window.location.href });
          } else if (StateInterface?.uri === undefined) {
            liff.login({ redirectUri: window.location.href });
          } else {
            liff.login({ redirectUri: StateInterface?.uri });
          }
        } else {
          getProfile();
        }
      });
  };
  const getProfile = () => {
    liff.getProfile().then((profile) => {
      const UserId = profile.userId;
      const displayName = profile.displayName;
      console.log(profile.userId);
      setIDLine(UserId);

      GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
        authen_code: UserId,
        platform_name: "lineauthen",
      }).then((res) => {
        if (res.Status === "Success") {
          if (res.Data === "True") {
            Auth.Login(AuthenticateLine, UserId, "000000").then((res) => {
              if (res.Status === "Success") {
                navigate("/");
              }
            });
          } else {
            GetdataAPI_Outside("/api/Main/Register", {
              PhoneNumber: "",
              Password: "000000",
              UserName: UserId,
              User_Name: displayName,
            }).then((Register) => {
              if (Register.Status === "Success") {
                Auth.Login(Authenticate, UserId, "000000").then((res) => {
                  if (res.Status === "Success") {
                    GetdataAPI("/api/Main/SaveAuthenCode", {
                      authen_code: UserId,
                      platform_name: "lineauthen",
                    }).then((res) => {
                      if (res.Status === "Success") {
                        navigate("/");
                      }
                    });
                  }
                });
              }
            });
          }
        } else {
          MsgWarning(res.Message);
        }
      });
    });
  };

  const cc = () => {
    GetdataAPI_Outside("/api/Main/Register", {
      PhoneNumber: "0000",
      UserName: "ttttb",
      Password: "000000",
      Email: "",
      User_Name: "ttttb",
      user_pin: "000000",
    }).then((Register) => {
      console.log(Register);
    });
  };

  const rr = () => {
    Auth.RefreshDataUser().then((res) => {
      console.log(res.Data.haspin);
    });
  };

  const checkLineAppOpen = () => {
    if (navigator.userAgent.match(/Line/i)) {
      setOpenLine(true);
      if (params === null) {
        setLoadingLine(true);
        lineAuth();
      }

      // Replace with your own code to handle LINE app open event
    } else {
      setOpenLine(false);
    }
  };
  //------------------------HTML------------------------------
  return (
    <div>
      <div className={!LoadingLine ? "" : "hidden"}>
        <div className="container">
          <div className="grid grid-cols-12 gap-3 mt-8 mb-4">
            <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5 ">
              <UpimgIcon className="inline h-[auto] w-[70px] " />
            </div>
            <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-4">
              {t("ECOM")}
            </div>
            <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start  cursor-pointer px-4 ">
              <a
                className="bg-lime-500 hover:bg-lime-600 active:bg-lime-600 py-2 rounded text-white text-center kep-login-line"
                onClick={lineAuth}
              >
                <Line className="inline h-[auto] w-[20px] mr-2 fill-white " />
                {t("Login with LINE")}
              </a>
            </div>

            <div
              className={
                !OpenLine
                  ? "grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4"
                  : "hidden"
              }
            >
              <LoginFacebook />
            </div>

            <div
              className={
                !OpenLine
                  ? "grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4"
                  : "hidden"
              }
            >
              <Google_login />
            </div>
          </div>
          <div className="grid grid-cols-12 px-4">
            <div className="grid col-span-5 w-full">
              <div className="h-px  bg-gray-400 border-0 mt-2"></div>
            </div>

            <div className="grid col-span-2 w-full">
              <div className="text-center text-gray-500 text-sm -mt-[1px]">
                OR
              </div>
            </div>

            <div className="grid col-span-5 w-full">
              <div className="h-px  bg-gray-400 border-0 mt-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-3 mt-4">
            <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
              <TextBox
                placeholder="Email"
                ref={Username}
                valueChangeEvent="keyup"
                onValueChange={(e) => {
                  setuser(e);
                }}
              />
            </div>
            <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
              <TextBox
                mode="password"
                placeholder="Password"
                ref={Password}
                valueChangeEvent="keyup"
                onValueChange={(e) => {
                  setpass(e);
                }}
              />
              {noti ? (
                <label className="block text-sm font-medium text-red-600 mb-3">
                  {t("Username และ Password ไม่ถูกต้อง")}
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="grid col-span-12 content-start px-4">
              <button
                type="button"
                className="btn-save"
                onClick={login}
                ref={btnlogin}
                disabled={pass === "" || user === "" ? true : false}
              >
                {t("Continue")}
              </button>
            </div>
            <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 px-4">
              <span className="text-[14px]">
                <span
                  className="text-blue-600 cursor-pointer hover:text-blue-900"
                  onClick={ToForgotpass}
                >
                  {t("Forgot your password?")}
                </span>
              </span>
            </div>
            <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 ">
              <span className="text-[14px]">
                <span> {t("Don’t have a Memorybox account yet?")}</span>
              </span>
            </div>
            <div className="grid col-span-12 content-start px-4 pb-5">
              <button type="button" className="btn-save" onClick={ToSignUp}>
                {t("Sign up")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={LoadingLine ? "" : "hidden"}>
        <Loading />
      </div>
    </div>
  );
}

export default Login