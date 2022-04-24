const qs = require("querystring");
const handleUserRouter = require("../src/router/user");
const handleBolgRouter = require("../src/router/blog");
const { hanldePostData } = require("../src/utils");

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 设置path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = qs.parse(url.split("?")[1]);

  // 处理post数据
  hanldePostData(req).then((postData) => {
    req.body = postData;

    // 处理博客路由
    const blogData = handleBolgRouter(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }

    // 处理用户路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }

    // 未命中 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 not found");
    res.end();
  });
};

module.exports = serverHandle;
