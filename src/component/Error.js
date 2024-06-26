import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reissueToken } from "../api/user";
import Cookies from "js-cookie";

const Error = (error, refetch) => {
  console.log(error);
  const errorCode = error.errorCode;
  const errorMessage = error.errorMessage;
  const timeStamp = error.timeStamp;
  const navigate = useNavigate();

  switch (errorCode) {
    // 서버 오류
    // AccessToken 만료
    case "4105":
      // 토큰 재발급
      reissueToken()
        .then((data) => {
          Cookies.set("accessToken", data.accessToken);
          Cookies.set("refreshToken", data.refreshToken);
          refetch();
        })
        .catch((e) => {
          const errorCode = e.response.data.errorCode;
          // 재로그인 필요
          if (errorCode === "4106") {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
          }
        });

    default:
      return <div>{errorMessage}</div>;
  }
};

export default Error;
