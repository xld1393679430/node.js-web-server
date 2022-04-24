const env = process.env.NODE_ENV;

let mysql_conf = {};

if (env === "production") {
  mysql_conf = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog",
  };
} else {
  mysql_conf = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblog",
  };
}

module.exports = {
  mysql_conf,
};
