<template>
  <div>
    <h2>必须的打开vueBaseProject 项目，</h2>
    <div id="box"></div>
    <div>
      <h4 style="color:red">{{dataLists}}</h4>
    </div>
    <el-button type="primary" onclick="addSun('你好')">调用子页面方法</el-button>
    <!-- <iframe
      id="iframe"
      class="iframe"
      :src="urlPath"
      height="300"
      width="500"
      name="demo"
      scrolling="auto"
      :onload="this.load()"
      ref="iframe"
    ></iframe>-->

    <!-- 
        src=""        页面地址，有同域跨域之分
        height="300"  高度
        width="500"   宽度
        name="demo"   可通过window.frames[demo]被调用
        scrolling="auto"  滚动模式
        frameborder="0"   边框
        class="iframe"  类名
        id="iframe"     id
        ref="iframe"    vue获取内容
        :onload="this.load()"  ifram里面的方法

        sandbox="allow-same-origin"，
       （1） "allow-scripts"，     则允许运行 JavaScript。
        (2)空字符串 ("")，        行内框架的内容不允许运行脚本
        (3)allow-same-origin    允许 iframe 内容被视为与包含文档有相同的来源
        (4)allow-top-navigation  允许 iframe 内容从包含文档导航（加载）内容。
        (5)allow-forms          允许表单提交。
        (6)allow-scripts        允许脚本执行


    -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataLists: ""
    };
  },
  methods: {
    // load() {
    //   setTimeout(() => {
    //     // let iframe = window.frames["demo"];
    //     let iframe2 = document.getElementById("iframe").contentWindow;
    //     iframe2.postMessage("canshu", "https://gitee.com/");
    //   }, 3000);

    //   window.addEventListener("message", event => {
    //     console.log(event.data);
    //   });
    // }
    iframeInit() {
      let _this = this;
      var iframe = document.createElement("iframe");
      iframe.id = "iframe";
      iframe.name = "iframe";
      iframe.height = "300";
      iframe.width = "100%";
      iframe.scrolling = "auto";
      iframe.src = "http://localhost:9090/#/iframeSun";
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", function() {
          // 非ie加载完成，才会被调用的方法
          _this.iframeLoad();
        });
      } else {
        // ie加载完成，才会被调用的方法
        iframe.onload = function() {
          _this.iframeLoad();
        };
      }
      document.getElementById("box").appendChild(iframe);
    },

    //传递子页面参数
    iframeLoad() {
      debugger;
      //（1）发送给 iframe子页面的内容
      let iframe2 = document.getElementById("iframe").contentWindow;
      iframe2.postMessage(
        {
          cmd: "returnFormJson",
          params: "传送给子页面的数据"
        },
        "http://localhost:9090/#/iframeSun"
      ); //传给9090
    }

    // 调用子页面方法
  },
  mounted() {
    // 初始化
    this.iframeInit();

    // 获取子页面参数
    // (2) iframe子页面传过来的数据
    window.addEventListener("message", event => {
      console.log(2, event);
      //获取父页面传过来的数据
      if (event.origin == "http://localhost:9090") {
        //接收9090
        this.dataLists = event.data;
      }
    });
  }
};
</script>


