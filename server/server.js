const { basic } = require("./config");
const express = require("express");
const app = express();
// nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb
// 解决如下
// body-parser：Node.js 正文解析中间件。在处理程序之前在中间件中解析传入的请求主体，在req.body属性下可用。【获取前端数据的插件】
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ limit: "5000mb", extended: true }));
//引入依赖，解决跨域
app.use(require("cors")());
require("./utils/mysql")
require("./routes/client")(app);
// 定义图片上传路径，让真实静态地址可以通过“/images”直接访问
// 將所有請求先交給 express.static(__dirname + '/uploads'))处理，再托管到'/uploads'挂载路径的方式来实现
app.use("/images", express.static(__dirname + "/uploads"));
app.use("/", express.static(__dirname + "/client"));

app.listen(basic.port, () => {
  console.log(`${basic.name} app listening on prot ${basic.port}`);
});
