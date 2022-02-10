const path = require("path");
const fileUtils = require("./utils/file_utils");
module.exports = async (ctx, next) => {
  // 地址栏输入的url截取端口之后的值返回到这里,形如/api/seller
  const url = ctx.request.url;
  // 去掉/api，并拼接成真实文件的路径
  let filePath = "/data" + url.replace("/api", "") + ".json";
  // 根据path给出的__dirname拼接相对路径组成绝对路径
  filePath = path.join(__dirname, filePath);
  try {
    // 因为返回的是promise，所以直接用await获取值
    ctx.response.body = await fileUtils.getJsonFileData(filePath);
    // 解决异常
  } catch (error) {
    const errMsg = {
      info: "读取文件失败，不支持的文件路径",
      status: "404",
    };
    ctx.response.body = JSON.stringify(errMsg);
  }
  // 由于实际应用时不知道这个中间件会作为第几层中间件应用，所以还是要加next
  await next();
};
