// const Base64 = require("js-base64").Base64;
import { getSessionStorage } from "../common";
// import { Message } from "view-design";

import { Message } from 'element-ui';
/**
 *
 * *免登陆处理方法
 * @param {要跳转的地址} url
 * @param {标记是在新界面打开 还是在当前页面加载 默认0 新页面打开  其他情况 则在当前页面加载} type
 * @param {如果要在当前页面载入  则需要传入载体 一般都为iframe} vector
 * @param {项目中存储的用户登录信息，也是每次请求接口必须携带的参数} commData
 * 传入的参数URL最好必须配置好事http还是https
 *
 */
const agentPostMessage = (url, type = 0, vector, commData = getSessionStorage("CommData")) => {
  debugger
  // 判断传入的URL是否有http 如果没有就添加
  if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
    url = `http://${url}`;
  }
  let myPopup = null;

  //获取请求接口必传参数
  // 判断传入的参数是否是字符串 如果是就转化成json对象
  let coData = typeof commData === "string" ? JSON.parse(commData) : commData;
  // 获取路径二级菜单
  if (url.indexOf("?") !== -1) {
    // 去除字符串中的空格和换行
    url = url.replace(/\ +/g, "").replace(/[\r\n]/g, "");
    // 获取URL中的参数信息
    let params = url.substr(url.indexOf("?") + 1, url.length);
    // 将参数字符串转换成数组
    if (params.indexOf("&") != -1) {
      params = params.split("&");
    } else {
      params = [params];
    }
    // 循环数组  然后将固定格式的参数添加到要传参的json对象中
    params.forEach(item => {
      let key = item.substr(0, item.indexOf("="));
      let value = item.substr(item.indexOf("=") + 1, item.length);
      coData[key] = value;
    });
  }
  // let baseinfo = Base64.encode(JSON.stringify(coData));
  let baseinfo = JSON.stringify(coData);

  if (type === 0) {
    myPopup = window.open(url);
  } else if (vector != null) {
    myPopup = vector;
  } else {
    Message.error("当前页面加载，请传入载体");
    return;
  }
  // 这里使用延时发送数据  一般跳转三方都有有等待动画  所以等待三秒放数据
  let timer = setInterval(function () {
    myPopup.postMessage(baseinfo, url);
    window.addEventListener("message", function (e) {
      if (e.data === "success") {
        clearInterval(timer);
      }
    });
  }, 1500);
};
export default agentPostMessage;
