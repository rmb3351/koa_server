const fs = require("fs");
module.exports.getJsonFileData = (filePath) => {
  // 由于读文件的回调函数直接用return返回数据是无法返回到中间件里的,所以要用promise返回异步任务,然后在中间件里用await才好获取数据
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
