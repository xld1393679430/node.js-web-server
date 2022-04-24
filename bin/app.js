const qs = require("querystring");
const handleUserRouter = require("../src/router/user");
const handleBolgRouter = require("../src/router/blog");
const { hanldePostData, setCookie } = require("../src/utils");

const SESSION_DATA = {};

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 设置path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = qs.parse(url.split("?")[1]);

  // 处理cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const key = item.slice(0, item.indexOf("=")).trim();
    const value = item.slice(item.indexOf("=") + 1).trim();
    req.cookie[key] = value;
  });

  // 解析session
  let userId = req.cookie.userid;
  let needSetCookie = false;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
    req.session = SESSION_DATA[userId];
  }

  // 处理post数据
  hanldePostData(req).then((postData) => {
    req.body = postData;

    // 处理博客路由
    const blogRes = handleBolgRouter(req, res);
    if (blogRes) {
      blogRes.then((data) => {
        if (needSetCookie) {
          setCookie(res, { userId });
        }
        res.end(JSON.stringify(data));
      });
      return;
    }

    // 处理用户路由
    const userRes = handleUserRouter(req, res);
    if (userRes) {
      userRes.then((data) => {
        if (needSetCookie) {
          setCookie(res, { userId });
        }
        res.end(JSON.stringify(data));
      });
      return;
    }

    // 未命中 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 not found");
    res.end();
  });
};

module.exports = serverHandle;
