const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1650774841288,
      author: "AA",
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1650774841288,
      author: "BB",
    },
  ];
};

const getDetail = (id) => {
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1650774841288,
    author: "AA",
  };
};

const createBlog = (blog = {}) => {
  return {
    id: 99999,
    title: "新Blog标题",
    content: "新Blog内容",
    createTime: 1650774841288,
    author: "creator",
    ...blog,
  };
};

const updateBlog = (id, blog = {}) => {
  return true;
};

const deleteBlog = (id) => {
  return true;
};

module.exports = {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
};
