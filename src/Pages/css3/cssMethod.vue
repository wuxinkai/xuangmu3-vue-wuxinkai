<template>
  <div>
    <div>
      <h3><a
          id="toc-07e"
          class="anchor"
        ></a>按需使用Vant组件</h3>
      <div class="item">
        <div><span class="label">{{item.name}}</span>：小明</div>
        <div><span class="label">{{item.year}}</span>：1990年3月14日</div>
        <div><span class="label">{{item.age}}</span>：男</div>
      </div>
      <code class="hljs lang-javaScript firekylin-code">
        <ul>
          <li><span
              class="line-num"
              data-line="1"
            >
              .item {
              margin-bottom: 8px;
              .label {
              display: inline-block;
              height: 100%;
              min-width: 100px;
              text-align: justify;
              text-align-last: justify;
              }
              .value {
              padding-right: 10px;
              }
              }
            </span>
          </li>
        </ul>
      </code>
      <br>
    </div>

    <!-- 渐变线 -->
    <div>
      <h3><a
          id="toc-07e"
          class="anchor"
        ></a>细线边框的写法</h3>
      <div class="item">
        <ul class="line">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <br>
    </div>

    <!-- 鼠标华过后的样式 -->
    <div>
      <h3><a
          id="toc-07e"
          class="anchor"
        ></a>细线边框的写法</h3>
      <div class="item">
        <ul class="box">
          <li>
            <div class="thumbnail"></div>
          </li>
          <li>
            <div class="thumbnail"></div>
          </li>
          <li>
            <div class="thumbnail"></div>
          </li>
        </ul>
      </div>
       <code class="hljs lang-javaScript firekylin-code">
        <ul>
          <li><span
              class="line-num"
              data-line="1"
            >
         .box {
              list-style: none;
              background: #fff;
            }

            .box li {
              position: relative;
              height: 25px;
              padding: 20px 0;
              border-bottom: 1px solid #e9eaed;
            }

            .box li:after {
              content: "";
              position: absolute;
              bottom: -1px;
              left: 0;
              width: 0;
              height: 1px;
              background: #9466ff;
              -webkit-transition: 0.4s;
              transition: 0.4s;
            }

            .box li:hover .thumbnail {
              -webkit-transform: scale(1.1);
              transform: scale(1.1);
            }

            .box li:hover:after {
              width: 100%;
            }
            .thumbnail {
              width: 130px;
              height: 30px;
              background: red;
            }
            </span>
          </li>
        </ul>
      </code>
      <br>
      <br>
    </div>


    <!-- 荧光边框写法 -->
        <div>
      <h3><a
          id="toc-07e"
          class="anchor"
        ></a>荧光边框写法</h3>
      <div class="outerColor" style="height:200px">
      
      </div>
      <br>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      item: { name: '名字', year: '出生年月', age: '性别' }
    };
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
//justify对最后一行无效，通常这样的排版对整段文字是极好的，
//根据justify对最后一行无效，我们可以新增一行，使该行文本不是最后一行
//scss
// .item {
//   // height: 22px;
//   // line-height: 22px;
//   margin-top: 18px;
//   .label {
//     display: inline-block;
//     height: 100%;
//     width: 80px;
//     font-weight: bold;
//     text-align: justify;
//     vertical-align: top;
//     &::after {
//       display: inline-block;
//       width: 100%;
//       content: "";
//       height: 0;
//     }
//   }
// }

//最近新了解到的一个属性text-align-last，该属性定义的是一段文本中最后一行在被强制换行之前的对齐规则。
.item {
  margin-bottom: 8px;
  .label {
    display: inline-block;
    height: 100%;
    min-width: 100px;
    text-align: justify;
    text-align-last: justify;
  }
  .value {
    padding-right: 10px;
  }
}

//渐变线
.line {
  // height: 300px;
  list-style: none;
  //  height: 20px;
  background: #fff;
}
// 所以想到了CSS3阴影（box-shadow），就是用阴影做描边然后用伪类把多余的给遮罩着，
.line li {
  height: 30px;
  box-shadow: inset 0 -1px 1px #000;
  background: #fff;
  margin-left: -1px;
  margin-bottom: 10px;
  position: relative;
}
.line li::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border: 1px solid #fff;
}

// 鼠标华过后的样式
.box {
  list-style: none;
  background: #fff;
}

.box li {
  position: relative;
  height: 25px;
  padding: 20px 0;
  border-bottom: 1px solid #e9eaed;
}

.box li:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: #9466ff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.box li:hover .thumbnail {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.box li:hover:after {
  width: 100%;
}
.thumbnail {
  width: 130px;
  height: 30px;
  background: red;
}


// 荧光边框
.outerColor {
  background: linear-gradient(#10153f, #233068);
  border: 1px solid #0997dd;
  -webkit-box-shadow: #0997dd 0 0 10px;
  border-radius: 4px;
}
</style>

