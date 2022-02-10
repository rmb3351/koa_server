// 引入第三方模块websocket
const WebSocket = require("ws");
// 引入读写文件的js文件
const fileUtils = require("../utils/file_utils");
const path = require("path");
// 创建WebSocket服务器对象
const wss = new WebSocket.Server({
  port: 9998,
});
// 将wss的监听事件全部封装到这个listen方法里
module.exports.listen = () => {
  // 对服务器对象监听客户端的链接
  wss.on("connection", (client) => {
    // 对链接socket的客户端对象监听发送信息的事件并获取信息
    client.on("message", async (msg) => {
      let param = JSON.parse(msg);
      // 如果是获取数据的行为就去相对路径获取并返回数据
      if (param.action === "getData") {
        // 获取数据文件的相对路径，然后拼接成绝对路径
        let filePath = "../data/" + param.chartName + ".json";
        filePath = path.join(__dirname, filePath);
        // 获取到json文件数据后添加到param对象内，再把param返回
        const data = await fileUtils.getJsonFileData(filePath);
        param.data = data;
        client.send(JSON.stringify(param));
        // 否则之间给所有连接的客户端转发message
      } else {
        wss.clients.forEach((client) => {
          // 这里不能直接转发msg，log出来的msg的内容和JSON.stringify(param)完全不同，这样到socket_service里就会报错
          client.send(JSON.stringify(param));
        });
      }
    });
  });
};
