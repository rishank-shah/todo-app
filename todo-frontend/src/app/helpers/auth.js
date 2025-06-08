import axios from "axios";
import { format } from "date-fns";
import API from "../constants/api";
import COOKIE from "../constants/cookie";
import CookieHelper from "./cookie";

export const handleLogoutUser = () => {
  CookieHelper.deleteDataBulk(
    [
      COOKIE.key.ACCESS_TOKEN,
      COOKIE.key.REFRESH_TOKEN,
      COOKIE.key.AUTH_EXPIRES,
    ],
    COOKIE.attributes
  );
  window.location.pathname = "/login";
};

export const authExpireAt = (expirySec) => {
  const date = new Date();

  return format(
    new Date(date.setSeconds(date.getSeconds() + parseInt(expirySec, 10) - 60)),
    "yyyy/MM/dd hh:mm a"
  );
};

export const GetToken = async () => {
  const [refreshToken, authExpires] = CookieHelper.getDataBulk([
    "refresh_token",
    "auth_expires",
  ]);

  if (new Date(authExpires).getTime() < new Date().getTime()) {
    const config = {
      method: "get",
      url: API.REFRESH_USER_TOKEN,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };

    try {
      const response = await axios(config);
      const expiresAt = authExpireAt(response.headers.expires);
      CookieHelper.setDataBulk(
        [
          { key: "access_token", data: response.data.result.accessToken },
          { key: "auth_expires", data: expiresAt },
        ],
        COOKIE.attributes
      );
    } catch (err) {
      if (err?.response?.status === 401) {
        handleLogoutUser();
      }
    }
  }
};
