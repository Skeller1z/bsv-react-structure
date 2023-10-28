import GoogleLogin from "react-google-login";
import { GetdataAPI, GetdataAPI_Outside } from "../../../../MainCall/MainCall";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { MsgWarning } from "../../../../MainCall/dialog";
import Auth from "../../../../MainCall/Auth";
import auhv from "../../../../MainCall/auhv.json";
import { useRef } from "react";

const Google_login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("cartstore");
  const navigate = useNavigate();
  const clientId =
    "79338267140-tpc58v80c3or1b6qg2rc7jercfu7q24s.apps.googleusercontent.com";
  const [loginType, setloginType] = useState("");
  const { AuthenticateGoogle } = auhv;
  const { Authenticate } = auhv;
  const isRunned = useRef(false);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    function start() {
      gapi.client.init({
        client_id: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log(response);
    const UserId = response.googleId;
    const email = response.profileObj.email;
    const displayName =
      response.profileObj.givenName + " " + response.profileObj.familyName;
    GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
      authen_code: UserId,
      platform_name: "googleauthen",
    }).then((res) => {
      if (res.Status === "Success") {
        if (res.Data === "True") {
          Auth.Login(AuthenticateGoogle, UserId, "000000").then((res) => {
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
                    platform_name: "googleauthen",
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
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <>
      <script
        src="https://apis.google.com/js/platform.js?onload=init"
        async
        defer
      ></script>
      <GoogleLogin
        className="justify-center"
        clientId={clientId}
        buttonText="Login With Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </>
  );
}

export default Google_login