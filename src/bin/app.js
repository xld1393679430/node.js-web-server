const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    const data = {
        name: 'ssss',
        age: 102,
        env: process.env.NODE_ENV
    }

    res.end(JSON.stringify(data))
};

module.exports = serverHandle;
