 <template>
  <div>
    <div id="framePlayer" class="framePlayerBox"></div>
  </div>
</template>
<script>
import "@/assets/js/vframeplayer.js";
export default {
  data() {
    return {
      // 控制组件显隐
      IsLoginPage: false
    }
  },
  computed: {

  },
  mounted() {
    this.playFramePlayer();
  },
  methods: {
    // 序列动画
    playFramePlayer() {
      let imgs = [];
      let _this = this;
      for (let i = 0; i < 112; i++) {
        let imgname = '';
        if (i < 10) {
          // 启动动画完成稿108000' + i + '.jpg'      Simple_1000.jpg    合成 4_1000
          imgname = require('@/assets/images/login_animation/Simple_100' + i + '.jpg');
        } else if (i > 9 && i < 100) {
          imgname = require('@/assets/images/login_animation/Simple_10' + i + '.jpg');
        } else {
          imgname = require('@/assets/images/login_animation/Simple_1' + i + '.jpg');
        }
        imgs.push(imgname)
      }
      let frameplayer = new vFramePlayer({
        dom: document.getElementById("framePlayer"),
        imgArr: imgs,
        fps: 15,
        useCanvas: true,
      });
      frameplayer.play(
        {
          onComplete: function () {
            // 播放结束监听事件,控制input框的显示隐藏
            _this.IsLoginPage = true;
            // _this.$emit("playOver", true)
          },
        }
      );
    }
  },
}
</script>
<style  scoped>
.framePlayerBox {
  height: 800px;
  width: 1200px;
}
.Myfade-enter-active,
.Myfade-leave-active {
  transition: opacity 1.5s;
}
.Myfade-enter, .Myfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>