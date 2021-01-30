<template>
  <div>

    <h1 class="red">（1）单行文本截断 text-overflow 兼容性较好</h1>
    <div class="box1">
      看似十分简单的标题截断效果，但是竟然没有一个统一 CSS 属性实现标准，需要用到一些奇淫妙计来实现，一般来说，在做这样文字截断效果时我们更多是希望： 文本溢出我们经常用到的应该就是 text-overflow:ellipsis
      了，相信大家也很熟悉，只需轻松几行代码就可以实现单行文本截断。
    </div>
    <br>
    <br>
    <h1 class="red">（2）-webkit-line-clamp 实现，到第二行才隐藏</h1>
    <div class="box2">
      它需要和 display、 -webkit-box-orient 和 overflow 结合使用：
      ◾display:-webkit-box; 必须结合的属性，将对象作为弹性伸缩盒子模型显示。
      ◾-webkit-box-orient; 必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式。
      ◾text-overflow:ellipsis; 可选属性，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。
    </div>
    <br>
    <br>
    <h1 class="red">（3）定位元素实现多行文本截断</h1>
    <div class="wrap">
      <div class="text">
        另外还有一种靠谱简单的做法就是设置相对定位的容器高度，用包含省略号(…)的元素模拟实现，实现方式如下：

        但是它无法识别文字的长短，即文本超出范围才显示省略号，否则不显示省略号。还有因为是我们人为地在文字末尾添加一个省略号效果，就会导致它跟文字其实没有贴合的很紧密，遇到这种情况可以通过添加
        word-break:break-all; 使一个单词能够在换行时进行拆分。
      </div>
    </div>
    <br>
    <br>
    <h1 class="red">(4)设置成第三行溢出隐藏效果</h1>
    <div class="">
      <div class="treen">
        另外还有一种靠谱简单的做法就是设置相对定位的容器高度，用包含省略号(…)的元素模拟实现，实现方式如下：
        但是它无法识别文字的长短，即文本超出范围才显示省略号，否则不显示省略号。还有因为是我们人为地在文字末尾添加一个省略号效果，就会导致它跟文字其实没有贴合的很紧密，遇到这种情况可以通过添加
        word-break:break-all; 使一个单词能够在换行时进行拆分。
      </div>
    </div>
    <br>
    <br>
    <br>
    <div>
       <h1 class="red">(5)js控制显示方式：</h1>
      <p
        id="p2"
      >在浊世之中，心灵留出一方净土，让纯纯的柏拉图式爱情扎根，多一些简单，多一些幻想，便会多一些美好！如果你愿意，不妨泡上一杯咖啡，在阳光下继续写柏拉图式爱情的文字！</p>
      <br />
    </div>
    <br>
    <br>
    <br>
    <h1><a href="javascript:" class="flow-wave">hover我（移动端按下）</a></h1>
  </div>
</template>

<script>
import ellipsis from '@/utils/ellipsis'
export default {

  data() {
    return {
      data: {
        textneme: ''
      }
    };
  },
  created() { //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。

  },
  mounted() { //在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    //通过导入导入传递参数改变页文字的字数
    ellipsis.cntercept(p2, 30);
  },
  methods: {
  }
};
</script>

<style lang="scss" type="text/scss">
.red {
  color: red;
}

.box1 {
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box2 {
  width: 50%;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.wrap {
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}

.wrap .text {
  float: right;
  margin-left: -5px;
  width: 100%;
  word-break: break-all;
}
.wrap::before {
  float: left;
  width: 5px;
  content: "";
  height: 40px;
}

.wrap::after {
  /* 为了展示效果更好 */
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(255, 255, 255, 0)),
    to(white),
    color-stop(50%, white)
  );
  background: -moz-linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    white 50%,
    white
  );
  background: -o-linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    white 50%,
    white
  );
  background: -ms-linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    white 50%,
    white
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    white 50%,
    white
  );
  float: right;
  content: "...";
  height: 20px;
  line-height: 20px;
  text-align: right;
  /* 为三个省略号的宽度 */
  width: 50px;
  /* 使盒子不占位置 */
  margin-left: -50px;
  /* 移动省略号位置 */
  position: relative;
  left: 100%;
  top: -20px;
  padding-right: 5px;
}

/* 第三行移除隐藏 */
.treen {
  position: relative;
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
}
.treen::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}

/* 波浪线 */
.flow-wave {
    padding: 5px 0;
}
.flow-wave:hover,
.flow-wave:focus {
    background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
        radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
    background-size: 20px 20px;
    background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
    animation: waveFlow 1s infinite linear;
}
@keyframes waveFlow {
    from { background-position-x: -10px, 0; }
    to { background-position-x: -30px, -20px; }
}

</style>

