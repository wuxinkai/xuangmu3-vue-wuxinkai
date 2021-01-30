<template>
  <div class="item-list">
    <div class="item-category">
      <div class="item-content">
        <!-- <div v-popover:LOGIC_RULE class="item item-function" data-type="FUNCTION" data-name="LOGIC_RULE">
          <div class="item-icon"><img :src="icon.LOGIC_RULE" /></div>
          <div class="item-label">逻辑规则</div>
        </div>
        <div v-popover:ARITHMETIC class="item item-function" data-type="FUNCTION" data-name="ARITHMETIC">
          <div class="item-icon"><img :src="icon.ARITHMETIC" /></div>
          <div class="item-label">四则规范</div>
        </div> -->
        <el-row class="mt-30">
          <el-col :span="12" v-for="(item,index) in GroupDataSource" :key="index">
            <div class="item drag-box">
              <img :src="'static/images/list'+item.icon+'.png'" :iconType="item.icon" :name="item.name" :paletteGroup="item.paletteGroup" :iconStyle="item.iconStyle" :id="item.id" :pid="item.paletteGroup_id" />
            </div>
            <p class="item-text">{{item.name}}</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { icon } from './enum'
export default {
  name: 'item-list',
  props: ["GroupDataSource"],
  data() {
    return {
      icon
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.item-text {
  text-align: center;
  color: #fff;
  margin: 4px 0 26px 0;
}
.item-list {
  box-sizing: border-box;
}

.item-category {
  padding: 10px 0;
}

.item-header {
  margin-bottom: 10px;
  color: #999;
  font-size: 14px;
}

.item {
  position: relative;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 54px;
  margin: 0 auto;
  cursor: move;
  outline: none;

  &.item-input {
    background: rgb(22, 156, 228);
  }
  &.item-function {
    background: rgb(143, 187, 52);
  }
  &.item-action {
    background: rgb(255, 197, 57);
  }
  &:hover {
    .item-port {
      background: #eee;
    }
  }

  .item-icon {
    position: absolute;
    width: 30px;
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.05);

    img {
      position: absolute;
      top: 3px;
      left: 4px;
    }
  }

  .item-label {
    margin-left: 28px;
    line-height: 26px;
    overflow: hidden;
    text-align: center;
    color: #fff;
    font-size: 13px;
  }

  .item-port {
    position: absolute;
    top: 9px;
    width: 10px;
    height: 10px;
    border: 1px solid #999;
    box-sizing: border-box;
    border-radius: 3px;
    background: #d9d9d9;

    &.item-port-input {
      left: -5px;
    }

    &.item-port-output {
      right: -5px;
    }
  }
}
</style>
