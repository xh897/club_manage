// crypto 主要功能有 哈希、对称加密以及非对称加密；MD5是哈希
const crypto = require("crypto");
module.exports = { 
    // 把加密的功能封装成一个对象并且输出出去 (即暴露此功能模块对象)
    autograph:"community", //这里可以不要,但是现在使用的是md5加密模式,不要这里的自定义字符串
    // 别人拿到你的加密密码,还是可以通过md5解密器进行暴力破解的,加上此字符串就不能进行暴力破解了
    md5:function (password) {
        const md5 = crypto.createHash("md5"); //设置加密模式为md5
        md5.update(password+this.autograph); //把传入的用户密码和自定义的字符串进行编译的到加密过后的密码
        const result = md5.digest("hex"); //设置密码格式为16进制
        return result;//返回后加密过后的密码
    }
}