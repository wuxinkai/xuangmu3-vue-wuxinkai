<template>
  <div id="topo-container">
    <!-- 左侧列表 -->
    <item-list id="item-list-left" :GroupDataSource="getGroupData_C"></item-list>
    <!-- 右侧信息 -->
    <div class="item-rights" id="centerRight">
      <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" class="grid-tabs" @tab-click="handleTabsClick">
        <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.isEditChange?item.title+' *':item.title" :name="item.name">
          <!-- 自己加进来的title 用插槽替换element的组件内容  slot="label" -->
          <span slot="label" :title="item.title">
            <i style="color:red;font-size:16px" v-show="item.isEditChange">*</i>
            {{item.title}}
          </span>
          <div>
            <div class="toolbar">
              <el-button size="medium">返回</el-button>
              <el-button type="primary" size="medium" @click="save()">保存</el-button>
            </div>
            <svg class="topo-chart" :id="item.content" :key="item.name" width="5000" height="5000"></svg>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as util from "&/topo/util";
import Chart from "&/topo/chart";
import itemList from "&/topo/item-list.vue";

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
      },
      editableTabsValue: '1', //tabs 标签默认选中第二个
      editableTabs: [],
      tabIndex: 1,
      getGroupData_C: null, //保存子组件数据源
      isEditChange: false, //tab切换栏 上的（*）星号是否显示
    }
  },
  mounted() {
    var container = d3.select(`#svg${this.editableTabsValue}`);
    //创建一个实例
    chart = new Chart({
      container: container,
      data: this
    });

    this.handleTabsEdit(null, 'add');
    this.loadData();
    //请求左侧列表数据
    this.getLeftListData().then(() => {
      this.bindDragEvent();
    })
    //页面监听星号是否显示
    this.watchEvent();
  },
  created() {

  },
  methods: {
    onConfirm() {
      alert();
    },
    bindDragEvent() {
      let makeId = util.makeId(); //创建item的id
      let dragDeltaX, dragDeltaY, dragItem, $dragItem;
      let items = d3.selectAll(".item-list .item");
      let $centerRight = document.getElementById("centerRight"); //减去 chart-container 的位置
      //通过dom获取每个item的信息
      let DataSourceInfo = {
        id: "", //数据源ID
        name: "", //数据源名称
        imgUrl: "", //数据源图标
        paletteGroup: "" //数据源分组信息
      };
      let count = 1;
      let drag = d3
        .drag()
        .on("start", function () {
          // 获取当前选中数据源item图标的信息的信息
          DataSourceInfo.id = this.firstElementChild.attributes.id.nodeValue;
          DataSourceInfo.name = this.firstElementChild.attributes.name.nodeValue;
          DataSourceInfo.imgUrl = this.firstElementChild.attributes.iconType.nodeValue;
          DataSourceInfo.paletteGroup = this.firstElementChild.attributes.palettegroup.nodeValue;
          //获取团拽目标的 坐标
          let mousePosition = d3.mouse(this);
          dragDeltaX = mousePosition[0];
          dragDeltaY = mousePosition[1];
          //克隆
          dragItem = this.cloneNode(true);
          //将克隆的内容插入到尾部
          document.getElementById("app").append(dragItem);
          $dragItem = d3.select(dragItem);
          //设置在画布中的x轴坐标和y轴坐标
          getItemPosition($dragItem, d3.event.sourceEvent.x - dragDeltaX, d3.event.sourceEvent.y - dragDeltaY - 70);
        })
        //拖拽中的位置
        .on("drag", function () {
          getItemPosition($dragItem, d3.event.sourceEvent.x - dragDeltaX, d3.event.sourceEvent.y - dragDeltaY - 70
          );
        })
        //放下后的位置
        .on("end", function () {
          var arrItem = [];
          //设置偏移量
          let position = {
            x: d3.event.sourceEvent.x - dragDeltaX - $centerRight.offsetLeft - 200,
            y: d3.event.sourceEvent.y - dragDeltaY - $centerRight.offsetTop - 156
          };
          if (position.x > 0) {
            //设置两个按钮的重合
            var ftop = position.x;
            var fleft = position.y;
            var ObgjecItem = chart.getItemsNoid();
            console.log(ObgjecItem);
            ObgjecItem.forEach(function (item) {
              var btop = item.x;
              var bleft = item.y;
              if (ftop + 50 < btop || ftop > btop + 50 || fleft + 50 < bleft || fleft > bleft + 50) {
                console.log("和所有兄弟都不相交");
              } else {
                //新增一个图标
                var item2 = chart.addItem({
                  x: position.x + 200,
                  y: position.y,
                  uId: makeId,
                  text: '头部类型' + makeId,
                  type: 3,
                  itemIcon: 'static/images/list4.png',
                  data: null,
                });
                arrItem.push(item2);
                console.log("和某个兄弟相交:", item.id);
              }
            });

            //调用的是chart.js的 addItem方法
            var item1 = chart.addItem({
              x: position.x,
              y: position.y,
              uId: makeId,
              text: '头部类型' + makeId,
              type: 1,
              itemIcon: 'static/images/list4.png',
              data: null,
            });
            arrItem.push(item1);
          }
          $dragItem.remove();
        });
      items.call(drag); //用call 设置样式

      //给拖拽过来的 元素 设置在画布的位置
      let getItemPosition = function ($item, x, y) {
        $item.attr(
          "style",
          `position:fixed;transform:translate(${x}px, ${y}px)`
        );
      };
    },
    save() {
      // 项目中替换为持久存储
      localStorage.setItem("items", JSON.stringify(chart.getItems()));
    },
    loadData() {
      // chart.setItems(JSON.parse(localStorage.getItem("items")));
    },
    //切换画布  type:1-新增画布，2-加载已有画布
    handleTabsClick(canvasId, type) {
    },
    // tab 增加新内容
    handleTabsEdit(targetName, action) {
      let newTabName = util.makeId();
      if (action === 'add') {
        //监听画布信息
        this.watchEvent();
        this.editableTabs.push({
          title: '画布' + `${newTabName}`,
          name: newTabName,
          content: `svg${newTabName}`,
          isEditChange: false, //是否显示星号
        });
        this.editableTabsValue = newTabName;

        /*********** （2）知识点在这里不添加this.$nextTick 就获取不到dom **************************/
        //从新创造实例
        this.$nextTick(() => {
          var container = d3.select(`#svg${this.editableTabsValue}`);
          chart = new Chart({
            container: container,
          });
        })
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
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
    },
    //请求左侧列表数据
    getLeftListData() {
      /*********（1）知识点Promise 解决dom加载完成的方法 ********** */
      return new Promise((resolve, reject) => {
        this.http.get('https://www.easy-mock.com/mock/5c468fcd3ea95957a403a95c/KRYL/queryGroupData').then((data) => {
          if (data.status == 200) {
            this.getGroupData_C = data.data.data
            resolve()
          }
        }).catch(function (err) {
          reject()
          console.log('获取内容失败')
        })
      })
      // 老办法 用定时器解决
      // setTimeout(() => {
      //   this.bindDragEvent();
      // }, 1000);
    },
    //监听画布上的内容是否被修改过。修改过就会出现星号
    watchEvent() {
      setTimeout(() => {
        var _this = this;
        //获取的是当前画布
        document.querySelectorAll('.el-tabs__content .topo-chart').forEach(item => {
          //dom被修改的的时候被触发
          item.addEventListener('DOMSubtreeModified', () => {
            _this.editableTabs.forEach((el, index) => {
              console.log(el.name == this.editableTabsValue);
              if (el.name == this.editableTabsValue) {
                el.isEditChange = true
                //从新渲染element ui
                _this.$set(_this.editableTabs, index, el)
              }
            })
          })
        })
      }, 1000)
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
  width: 160px;
  padding-left: 20px;
  border-right: 1px solid #ccc;
  box-shadow: 5px 5px 15px #666;
  float: left;
  background: #3d545c;
  float: left;
}

.item-rights {
  float: left;
  left: 190px;
  width: 86%;
  position: absolute;
  .grid-tabs {
    background: #fff;
    height: 600px;
    width: 100%;
  }
}
.topo-chart {
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

.topo-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }

  .el-dialog__footer {
    border-top: 1px solid #eee;
  }

  .el-select {
    display: block;
  }

  .el-input-number {
    width: 100%;

    .el-input__inner {
      text-align: left;
    }
  }

  .el-dialog__body {
    max-height: 450px;
    overflow: auto;
  }
}
</style>

