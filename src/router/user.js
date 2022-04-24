const { login } = require("../../src/controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { setCookieExpires } = require("../utils");

const handleUserRouter = (req, res) => {
  const { method, path } = req;

  // 登录接口
  if (method === "GET" && path === "/api/user/login") {
    const { username, password } = req.query;
    return login(username, password).then((data) => {
      if (data && data.username) {
        // 后端设置cookie
        // 注意：1,设置path=/, 2, httpOnly 表示只允许后端更改 不允许前端通过document.cookie去更改cookie
        res.setHeader(
          "Set-Cookie",
          `username=${
            data.username
          }; path=/; httpOnly; expires=${setCookieExpires()}`
        );
        return new SuccessModel(true);
      }
      return new ErrorModel();
    });
  }
};

module.exports = handleUserRouter;
