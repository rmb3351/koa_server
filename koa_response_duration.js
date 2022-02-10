// 计算响应总时间的中间件
module.exports = async (ctx, next) => {
  let startTime = Date.now();
  // 直接await获取next返回的promise对象
  await next();
  let endTime = Date.now();
  let durationTime = endTime - startTime;
  // 设置响应头的属性
  ctx.set("X-Response-Time", durationTime + "ms");
};
