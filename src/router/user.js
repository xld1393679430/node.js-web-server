const { login } = require("../../src/controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method, path } = req;

  // 登录接口
  if (method === "POST" && path === "/api/user/login") {
    const { username, password } = req.body;
    return login(username, password).then((data) => {
      if (data && data.username) {
        return new SuccessModel(true);
      }
      return new ErrorModel();
    });
  }
};

module.exports = handleUserRouter;
