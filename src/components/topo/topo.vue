<template>
  <div id="topo-container">
    <item-list id="item-list-left"></item-list>
    <div id="chart-container">
      <div class="toolbar">
        <el-button size="medium">返回</el-button>
        <el-button type="primary" size="medium" @click="save()">保存</el-button>
      </div>
      <svg id="topo-chart" width="5000" height="5000"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import Chart from "./chart";
import Line from "./line";
import itemList from "./item-list.vue";

import "./dialog/_dialog.scss";

let chart = null;
export default {
  components: {
    itemList
  },
  name: "topo",
  data() {
    return {
      editItem: null,
      dialog: {
        DEVICE: false,
        CUSTOM_DATA: false,
        LOGIC_RULE: false,
        ARITHMETIC: false,
        APP: false,
        HTTP: false,
        EMAIL: false
      }
    };
  },
  mounted() {
    let container = d3.select("#topo-chart");
    //创建一个实例
    chart = new Chart({
      container: container,
      onItemDblclick: this.onItemDblclick //双击
    });

    this.loadData();
    this.bindDragEvent();
  },
  methods: {
    onConfirm() {
      alert();
    },
    bindDragEvent() {
      let dragDeltaX, dragDeltaY, dragItem, $dragItem;
      let items = d3.selectAll(".item-list .item");
      let count = 1;
      let drag = d3
        .drag()
        .on("start", function() {
          //获取团拽目标的 坐标
          let mousePosition = d3.mouse(this);

          dragDeltaX = mousePosition[0];
          dragDeltaY = mousePosition[1];
          //克隆
          dragItem = this.cloneNode(true);
          //将克隆的内容插入到尾部
          document.getElementsByTagName("body")[0].append(dragItem);
          $dragItem = d3.select(dragItem);
          //设置在画布中的x轴坐标和y轴坐标
          getItemPosition(
            $dragItem,
            d3.event.sourceEvent.x - dragDeltaX,
            d3.event.sourceEvent.y - dragDeltaY
          );
        })
        //拖拽中的位置
        .on("drag", function() {
          getItemPosition(
            $dragItem,
            d3.event.sourceEvent.x - dragDeltaX,
            d3.event.sourceEvent.y - dragDeltaY
          );
        })
        //放下后的位置
        .on("end", function() {
          var arrItem = [];
          //减去 chart-container 的位置
          let $container = document.getElementById("chart-container");
          //设置偏移量
          let position = {
            x: d3.event.sourceEvent.x - dragDeltaX - $container.offsetLeft,
            y: d3.event.sourceEvent.y - dragDeltaY - $container.offsetTop
          };
          if (position.x > 0) {
            //设置两个按钮的重合
            var ftop = position.x;
            var fleft = position.y;
            var ObgjecItem = chart.getItemsNoid();
            ObgjecItem.forEach(function(item) {
              var btop = item.x;
              var bleft = item.y;
              // console.log(btop);
              if (
                ftop + 50 < btop ||
                ftop > btop + 50 ||
                fleft + 50 < bleft ||
                fleft > bleft + 50
              ) {
                console.log("和所有兄弟都不相交");
              } else {
                //新增一个图标
                var item2 = chart.addItem({
                  x: position.x + 200,
                  y: position.y + 30,
                  id: "22222",
                  name: $dragItem.attr("data-name"),
                  type: $dragItem.attr("data-type")
                });
                arrItem.push(item2);
                console.log("和某个兄弟相交:", item.id);
              }
            });

            //调用的是chart.js的 addItem方法
            var item1 = chart.addItem({
              x: position.x,
              y: position.y,
              id: count,
              name: $dragItem.attr("data-name"),
              type: $dragItem.attr("data-type")
            });
            count++;
            arrItem.push(item1);
            console.log(arrItem)
            // let line = Chart._addLine(arrItem[0], "output", arrItem[1], "input");
            // line.updatePath();

            console.log(chart.getItems());
          }
          $dragItem.remove();
        });
      items.call(drag); //用call 设置样式

      //给拖拽过来的 元素 设置在画布的位置
      let getItemPosition = function($item, x, y) {
        $item.attr(
          "style",
          `position:absolute;transform:translate(${x}px, ${y}px)`
        );
      };
    },
    save() {
      // 项目中替换为持久存储
      localStorage.setItem("items", JSON.stringify(chart.getItems()));
    },
    loadData() {
      chart.setItems(JSON.parse(localStorage.getItem("items")));
    },
    //双击事件
    onItemDblclick(item) {
      this.editItem = item;
      this.dialog[item.name] = true;
    },
    //双击关闭事件
    onCloseDialog(item) {
      // console.log(item);
      this.dialog[item.name] = false;
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.toolbar {
  position: absolute;
  right: 10px;
  top: 10px;
}

#item-list-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 160px;
  border-right: 1px solid #ccc;
  background: #f3f3f3;
}

#chart-container {
  position: absolute;
  top: 0;
  left: 160px;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

#topo-chart {
  cursor: crosshair;

  /deep/ .item {
    cursor: move;

    &.active .item-rect {
      stroke: red;
      stroke-width: 5px; //点击事件
      stroke-dasharray: 5px;
    }
  }

  /deep/ .item_label {
    font-size: 13px;
    fill: pink; //文字颜色
    stroke-width: 0;
    user-select: none;
  }

  /deep/ .port {
    fill: rgb(42, 10, 185);
    stroke: rgb(14, 212, 7); //边线颜色
    stroke-width: 2;
    cursor: crosshair;
  }

  /deep/ .port-hovered {
    fill: red;
    stroke: #ff7f0e;
  }

  /deep/ .line {
    //设置颜色
    fill: none;
    stroke: rgb(6, 19, 199);
    stroke-width: 4px; //粗细

    &.active {
      stroke: #ff7f0e;
      stroke-width: 4;
    }
  }
}
</style>
