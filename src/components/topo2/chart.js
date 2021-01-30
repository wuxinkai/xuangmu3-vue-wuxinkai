import Item from "../topo/item";

// import Item from './item'
// import Line from './line'
// import * as d3 from 'd3'
// import _ from 'lodash'

class Chart {
  constructor(params) {
    this.container = params.container
    this.list = {}
    this.listNode = [];
    this.lineList = {};
    this.drawingLine = false
    this.currentLine = null
    this.selectedLine = null
    this._bindEvent() //注册事件
  }
  /**
   * 添加元素
   * @param params 元素属性
   */
  addItem(params) {
    let item = new Item({
      container: this.container,
      id: params.id,
      x: params.x,
      y: params.y,
      name: params.name,
      inputIds: params.inputIds, //获取id  设置路径id  inputIds是左边
      outputIds: params.outputIds, //右边 连线
      data: params.data,
      onDrag: this._onItemDrag.bind(this), //拖拽当前图标
      // onClick: this._onItemClick.bind(this),
      // onMouseup: this._onItemMouseup.bind(this),
      // onRemove: this._onItemRemove.bind(this),
      // onPortMousedown: this._onPortMousedown.bind(this),
      // onPortMouseup: this._onPortMouseup.bind(this)
    })
  }

// 设置连线

setItems(items){
  _.forEach(items,item=>{
    item.inputIds =new Set(item.inputIds);
    item.outputIds =new Set(item.outputIds)
    this.addItem(item)
  })

  _.forEach(this.list,fromItem=>{
    fromItem.outputIds.forEach(outputId=>{
      let targetItem = this.list[outputId]
      //通过id连线
      let line = this._addLine(fromItem,'input',targetItem,'output')
      line.updatePath()
      line.fromItem['outputPathIds'].add(line.id) 
      line.targetItem['inputPathIds'].add(line.id)
      this.lineList[line.id] = line
    })
  })
}

  /**
   * 绑定事件
   */
  _bindEvent() {
    this.container.on('mousemove', this._onMousemove.bind(this)) //鼠标进入
    this.container.on('mouseup', this._onMouseup.bind(this)) //鼠标离开
  }
  /**
   * 鼠标在画板中移动
   */
  _onMousemove() {
    if (this.drawingLine && this.currentLine) {
      let coordinates = {
        x: d3.event.offsetX,
        y: d3.event.offsetY
      }
      this.currentLine.updatePath(coordinates)
      this.currentLine.path.classed('active', true)
    }
  }
  /**
   * 鼠标在画板空白位置抬起
   */
  _onMouseup() {
    if (!this.drawingLine) return
    if (this.currentLine) {
      this.currentLine.remove()
      this.currentLine = null
    }
    this.drawingLine = false
  }

  /**
   * 元素移动回调事件
   * @param item
   */
  _onItemDrag(item) {
    if (item.inputPathIds.size) {
      item.inputPathIds.forEach(id => {
        this.lineList[id].updatePath()
      });
    }

    if(item.outputPathIds.size){
      item.outputPathIds.forEach(id=>{
        this.lineList[id].updatePath()
      })
    }
  }
}
export default Chart
