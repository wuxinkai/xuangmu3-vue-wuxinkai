<template>
  <div class="message-box">
    <h2>{{title}}</h2>
    <p>{{content}}</p>
    <div  class="footer">
      <div @click="handleCancle(1)">{{cancel}}</div>
      <div @click="handleOk(2)">{{ok}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'js组件',
  data() {
    return {}
  },
  methods: { }
}
</script>
<style scoped>
.message-box {
  width: 200px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  box-shadow: 3px 3px 3px 3px #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -75px 0 0 -100px;
}
.message-box h2 {
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.message-box p {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
}
.footer > div {
  flex: 1;
  height: 40px;
  line-height: 40px;
  background: #f1f1f1;
  text-align: center;
}
.footer > div:hover {
  background: #999;
}
</style>
