module.exports = async (ctx, next) => {
  // 设置接收的mime类型和字符集
  const contentType = "application/json;charset=UTF-8";
  ctx.set("Content-Type", contentType);
  // 允许跨域访问
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  await next();
};
