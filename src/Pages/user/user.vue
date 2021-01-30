<template>
  <div>
    <h2>实现单点登录</h2>
    <el-button @click="JumpPage" type="success">单点登录按钮</el-button>
  </div>
</template>
<script>
import agentPostMessage from "@/utils/sys_utils/agent_postMessage"
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    JumpPage() {
      let url =`http://localhost:8080` + "/#/agent?id_t=77777"
        + "&id_1=" + '111111'
        + "&id_2=" + '222222'
        + "&id_3=" + '333333'
      
      agentPostMessage(url);
    }
  }
}
</script>

