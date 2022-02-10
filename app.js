// 获取并创建koa对象
const Koa = require("koa");
const app = new Koa();
// 当前路径下的./不能呢省略，否则当做第三方模块引入
const responseDuration = require("./koa_response_duration");
const responseHeader = require("./koa_response_header");
const responseData = require("./koa_response_data");
//编写响应函数（中间件）,这个ctx上下文中有request和response，可以对请求接收和响应
// app.use((ctx, next) => {
//   console.log(ctx.request.url);
//   ctx.response.body = "hello koa";
// });
app.use(responseDuration);
app.use(responseHeader);
app.use(responseData);
app.listen(8888);
console.log("服务器已启动");

const webSocketService = require("./service/web_socket_service");
// 调用这个listen就可以对wss里的事件分别监听了
webSocketService.listen();
