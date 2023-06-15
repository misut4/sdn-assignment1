const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getCookieWithJwtAccessToken(_id) {
  //get the cookie
  const payload = { _id };
  const token = jwt.sign(payload, {
    secret: process.env.SECRET_KEY,
    expiresIn: "10h",
  });
  return `Authentication=${token}; HttpOnly; Path=/; Max-Age=10h`;
}

async function getCookieWithJwtRefreshToken(_id) {
  // get refresh token
  const payload = { _id };
  const token = jwt.sign(payload, {
    secret: process.env.SECRET_REFRESH_KEY,
    expiresIn: "15d",
  });
  const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=15d`;
  return {
    cookie,
    token,
  };
}

async function verifyJwt(token, key) {
  try {
    return jwt.verify(token, { secret: key });
  } catch (error) {
    console.log(error);
  }
}

async function refreshToken(request) {
  const auth = this.verifyJwt(
    request?.cookies.Authentication,
    process.env.SECRET_KEY
  );
  const refresh = this.verifyJwt(
    request?.cookies?.Refresh,
    process.env.SECRET_REFRESH_KEY
  );
  if (auth.id == refresh.id) {
    const accessTokenCookie = this.getCookieWithJwtAccessToken(request.user.id); //get new access token
    request.res.setHeader("Set-Cookie", accessTokenCookie); // set new access token in the cookie
    return { id: request.user.id };
  } else {
    console.log(error);
  }
}

async function login(_id) {
  const accessTokenCookie = this.getCookieWithJwtAccessToken(_id); //get access token
  const refreshTokenCookie = this.getCookieWithJwtRefreshToken(_id); //get refresh token
  await this.userService.setCurrentRefreshToken(refreshTokenCookie.token, _id); //set current refresh token to database
  return {
    accessToken: accessTokenCookie,
    refreshToken: refreshTokenCookie.cookie,
  };
}

async function logout() {
  const clearToken = [
    "Refresh=; HttpOnly; Path=/; Max-Age=0",
    "Authentication=; HttpOnly; Path=/; Max-Age=0",
  ];
  return clearToken;
}

async function validateUser(username, password) {
  //TODO: get user of credentials
}

module.exports = {
  jwtService: {
    getCookieWithJwtAccessToken,
    getCookieWithJwtRefreshToken,
    verifyJwt,
    refreshToken,
    login,
    logout,
    validateUser
  },
};
