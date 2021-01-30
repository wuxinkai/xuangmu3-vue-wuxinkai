<template>
  <div>
    <drag-zone class="zone" :options="options">
      <drag-content class="d-zone c1">
        <div class="item i1">item 1 淘宝NPM 镜像这是一个完整 npmjs.org 镜像,你可以用此代替官方版本(只读),同步频率目前为 10分钟 一次以保证尽量与官方服务同步。</div>
      </drag-content>
      <drag-handle class="handle"></drag-handle>
      <drag-content class="d-zone c2">
        <div class="item i2">item 2</div>
      </drag-content>
      <drag-handle class="handle"></drag-handle>
      <drag-content class="d-zone c3">
        <div class="item i3">item 3</div>
      </drag-content>
      <drag-content class="d-zone c4">
        <div class="item i4">item 4</div>
      </drag-content>
      <drag-handle class="handle "></drag-handle>
      <drag-content class="d-zone c5">
        <div class="item i5">item 5</div>
      </drag-content>
    </drag-zone>
    <br>
    <br>
    <drag-zone class="zone2" :options="options2">
      <drag-content class="d-vertical c1">
        <div class="item2 i1">设置最小高度80。</div>
      </drag-content>
      <drag-handle class="handle"></drag-handle>
      <drag-content class="d-vertical c2">
        <div class="item2 i2">item 2</div>
      </drag-content>
      <drag-handle class="handle"></drag-handle>
      <drag-content class="d-vertical c3">
        <div class="item2 i3">item 3</div>
      </drag-content>
      <drag-content class="d-vertical c4">
        <div class="item2 i4">item 4</div>
      </drag-content>
      <drag-handle class="handle "></drag-handle>
      <drag-content class="d-vertical c5">
        <div class="item2 i5">item 5</div>
      </drag-content>
    </drag-zone>
  </div>
</template>

<script>
import { dragZone, dragHandle, dragContent } from 'vue-drag-zone'
export default {
  components: {
    dragZone,
    dragHandle,
    dragContent
  },
  data() {
    return {
      options: {
        direction: 'horizontal', //横向 horizontal   竖向 vertical
      },
      options2: {
        direction: 'vertical', //横向 horizontal   竖向 vertical
      },
      // disabled: 'disabled', //禁用拖拽
    };
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.zone .d-zone {
  width: calc((100% - 30px) / 5);
  height: 180px;
  overflow: auto;
}
.zone {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.zone {
  width: 100%;
  height: 180px;
  // line-height: 180px;
  margin: 0 auto;
  position: relative;
  clear: both;
  text-align: center;
  color: #fff;
  background: #eee;
}

.zone .handle {
  width: 10px;
  height: 180px;
  background: #2196f3;
}

.zone .item {
  width: 100%;
  height: 100%;
}

.zone .item.i1 {
  background: #999;
  min-width: 200px;
  overflow: auto;
}

.zone .item.i2 {
  background: #777;
}

.zone .item.i3 {
  background: #555;
}

.zone .item.i4 {
  background: #333;
}

.zone .item.i5 {
  background: #000;
}

// 竖向
.zone2{
  height: 600px;
}
.zone2 .d-vertical {
    width: 100%;
    height: calc((100% - 30px) / 5);
    overflow: hidden;
    text-align: center;
}
.handle.vertical {
  width: 100%;
  height: 10px;
  background: #2196f3;
}
.zone2 .item2 {
  width: 100%;
  height: 100%;
}
.zone2 .c1{
 min-height: 80px;
}
.zone2 .item2.i1 {
  background: #999;
  overflow: auto;
}

.zone2 .item2.i2 {
  background: #777;
}

.zone2 .item2.i3 {
  background: #555;
}

.zone2 .item2.i4 {
  background: #333;
}

.zone2 .item2.handle {
  background: #000;
}

</style>

