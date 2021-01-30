import store from "@/store";
// import { setSessionStorage } from "./common";
import {setSessionStorage} from "../common"
import { Message } from 'element-ui';
// const Base64 = require("js-base64").Base64;
import router from "../../router";

// agent免登陆
const LoginMessage = () => {
  window.addEventListener("message", function (event) {
    debugger
    if (event.data != undefined && typeof event.data === "string") {
      window.opener.postMessage("success", "*");
      let CommData = new Object();
      // let data = Base64.decode(event.data); // console.log(data)
      let data = JSON.parse(event.data);
      CommData.org_user_id = data.org_user_id;
      CommData.org_dept_id = data.org_dept_id;
      CommData.org_term_no = data.org_term_no;
      CommData.orguser_cn_name = data.orguser_cn_name;
      CommData.orgdept_cn_name = data.orgdept_cn_name;
      CommData.org_channel_code = data.org_channel_code;
      CommData.org_rs_code = data.org_rs_code;
      CommData.org_work_code = data.org_work_code;
      CommData.submit_type = data.submit_type;
      CommData.token = data.token;
      // 浏览器存储登录信息
      setSessionStorage("CommData", JSON.stringify(CommData));
      // 路由跳转 首页
      router.push({ path: "/" });
    } else {
      Message.error("登录跳转失败！");
    }
  });
};

export default LoginMessage;
