import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ApiHelper from "../../helpers/api";
import CookieHelper from "../../helpers/cookie";
import { GetToken, handleLogoutUser } from "../../helpers/auth";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});

  const handleLogin = useCallback((...args) => {
    setIsLoggedIn(true);
    setUser(args[0] || {});
  }, []);

  const handleLogout = useCallback(() => {
    handleLogoutUser();
    setIsLoggedIn(false);
    setUser({});
  }, []);

  useEffect(() => {
    const [accessToken, refreshToken, authExpires] = CookieHelper.getDataBulk([
      "access_token",
      "refresh_token",
      "auth_expires",
    ]);
    if (!accessToken || !refreshToken || !authExpires) {
      setIsLoggedIn(false);
      setUser({});
    }
  }, []);

  ApiHelper.setupInterceptors(
    (config) =>
      new Promise((resolve) => {
        const accessToken = CookieHelper.getData("access_token");
        const updatedConfig = { ...config };
        if (accessToken) {
          GetToken().then(() => {
            const updatedAccessToken = CookieHelper.getData("access_token");
            updatedConfig.headers.Authorization = `Bearer ${updatedAccessToken}`;
            resolve(updatedConfig);
          });
        }
      })
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, handleLogin, handleLogout, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
