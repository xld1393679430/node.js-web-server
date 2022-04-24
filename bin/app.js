const handleUserRouter = require("../src/router/user");
const handleBolgRouter = require("../src/router/blog");

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 处理博客路由
  const blogData = handleBolgRouter(req, res);
  console.log(blogData, '----blogData')
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  // 处理用户路由
  const userData = handleUserRouter(req, res);
  console.log(userData, '----userData')
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  // 未命中 404
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("404 not found");
  res.end();
};

module.exports = serverHandle;
