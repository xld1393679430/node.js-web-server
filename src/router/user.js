const { login } = require("../../src/controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method, path } = req;

  // 登录接口
  if (method === "POST" && path === "/api/user/login") {
    const { username, password } = req.body;
    const isLogin = login(username, password);
    if (isLogin) {
      return new SuccessModel(isLogin);
    }
    return new ErrorModel();
  }
};

module.exports = handleUserRouter;
