const { login } = require("../../src/controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method, path } = req;

  // 登录接口
  if (method === "GET" && path === "/api/user/login") {
    const { username, password } = req.query;
    return login(username, password).then((data) => {
      if (data && data.username) {
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        
        return new SuccessModel(true);
      }
      return new ErrorModel();
    });
  }

  // 测试登录接口
  if (method === "GET" && path === "/api/user/login-test") {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session,
        })
      );
    }
    return Promise.resolve(new ErrorModel());
  }
};

module.exports = handleUserRouter;
