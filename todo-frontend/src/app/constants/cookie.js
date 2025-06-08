export default {
  attributes: {
    path: "/",
    maxAge: 31536000,
    sameSite: true,
    secure: true,
  },
  key: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    AUTH_EXPIRES: "auth_expires",
  },
};
