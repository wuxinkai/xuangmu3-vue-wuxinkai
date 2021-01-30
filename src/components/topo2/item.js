import {
  type,
  bgColor,
  icon,
  name
} from './enum'
import * as util from './util'
import * as d3 from 'd3'

class Item {
  constructor(params) {
    this.container = params.container
    this.id = params.id || util.makeId()
    this.x = params.x
    this.y = params.y
    this.name = params.name
    this.title = params.title
    this.type = type[params.type]

    //记录 左右连接input/output 元素的id和连线对象
    this.inputIds = params.inputIds || new Set() //路径item 的id
    this.outputIds = params.outputIds || new Set()
    this.inputPathIds = new Set() //路径连线 id
    this.outputPathIds = new Set()
    this.data = params.data || null //数据

    // 回调事件
    this.onDrag = params.onDrag
    this.onClick = params.onClick
    this.onDblclick = params.onDblclick
    this.onRemove = params.onRemove
    this.onMouseup = params.onMouseup
    this.onPortMousedown = params.onPortMousedown
    this.onPortMouseup = params.onPortMouseup

    // 私有属性
    this._group = null
    this._text = null
    this._input = null
    this._output = null
    this._dragDeltaX = 0
    this._dragDeltaY = 0

    this._createElement()
    this._bindEvent()
  }
  /*
  删除元素
  */
  remove() {
    this._group.remove();
    this.onRemove(this)
  }

  /**
   * 取消选中
   */
  blur() {
    this._group.classed('active', false)
  }

  /**
   * 获取input具柄
   */
  getInputPort() {
    return this._input
  }

  /**
   * 获取output具柄
   */
  getOutputPort() {
    return this._output
  }

  /**
   * 更新元素 设置文字居中显示
   */
  updateItem(params) {
    let textWidth = util.getTextWidth(params.text) + 15
    let itemWidth = textWidth + 30;
    this._group.select('rect').attr('width', itemWidth) //矩形
    this.title = params.text
    this._text.text(this.title).attr('x', textWidth / 2 + 30)
    if (this._output) {
      this._output.attr('transform', `translate(${itemWidth -5 }, 10)`)
    }
    this.onDrag(this)
  }

  getTextWidth() {
    return parseInt(this._group.select('rect').attr('width'))
  }


  /**
   * 创建svg元素
   * 矩形 <rect>
   *圆形 <circle>
   *椭圆 <ellipse>
   *线 <line>
   *折线 <polyline>
   *多边形 <polygon>
   *路径 <path>
   */
  _createElement() {
    let group = this.container.append('g')
      .attr('transform', `translate(${this.x}, ${this.y})`)
      .attr('class', 'item  ddd')
    this._group = group
    group.append('rect')
      .attr('width', 54)
      .attr('height', 54)
      .attr('rx', 5) //rx 和 ry 属性可使矩形产生圆角
      .attr('rx', 5)
      .attr('fill', bgColor[this.type]) //填充颜色
      .attr('class', 'item item-rect')

    //文字
    let text = group.append('text')
    let title = this.title || name[this.name]
    this._text = text
    text.text(title)
      .attr('x', 43)
      .attr('y', 14)
      .attr('dy', '0.35em') //在字符的长度列表中移动相对最后绘制标志符号的绝对位置
      .attr('class', 'item_label') //设置文字颜色
      .attr('text-anchor', 'middle') //居中

    //左侧按钮
    if (~['ACTION', 'FUNCTION'].indexOf(this.type)) {
      let input = group.append('g')
        .attr('transform', 'translate(-6, 26)') // 上下位置
        .attr('class', 'port_input')
      this._input = input
      input.append('rect')
        .attr('rx', 5)
        .attr('ry', 5) //圆角
        .attr('width', 10) // 大小
        .attr('height', 10)
        .attr('class', 'port')
    }

    //右侧按钮
    if (~['INPUT', 'FUNCTION'].indexOf(this.type)) {
      let output = group.append('g')
        .attr('transform', 'translate(50, 26)')
        .attr('class', 'port_output')
      this._output = output
      output.append('rect')
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('width', 10)
        .attr('height', 10)
        .attr('class', 'port')
    }
  }

  /**
   * 绑定事件
   */
  _bindEvent() {
    this._group.on('click', this._onClick.bind(this))
    this._group.on('mouseup', this._onMouseup.bind(this))
    if (this._input) {
      this._input.on('mousedown', this._onPortMousedown.bind(this))
      this._input.on('mouseup', this._onPortMouseup.bind(this))
    }
    if (this._output) {
      this._output.on('mousedown', this._onPortMousedown.bind(this))
      this._output.on('mouseup', this._onPortMouseup.bind(this))
    }
    let drag = d3.drag()
      .on("start", this._onGroupDragstart.bind(this))
      .on("drag", this._onGroupDrag.bind(this))
    this._group.call(drag)
  }

  /**
   * 鼠标进入连线具柄
   * @private
   */
  //hover 事件
  // _onPortEnter() {
  //     d3.select(this).select('rect').classed('port-hovered', true)
  // }

  /**
   * 鼠标离开连线具柄
   * @private
   */
  //离开事件
  // _onPortLeave() {
  //     d3.select(this).select('rect').classed('port-hovered', false)
  // }

  /**
   * 鼠标按下连线具柄
   * @private
   */
  _onPortMousedown() {
    d3.event.stopPropagation()
    let portType = d3.select(d3.event.target.parentNode).attr('class').replace('port_', '')
    this.onPortMousedown(this, portType)
  }

  /**
   * 鼠标按钮抬在线具柄抬起
   * @private
   */
  _onPortMouseup() {
    d3.event.stopPropagation()
    let portType = d3.select(d3.event.target.parentNode).attr('class').replace('port_', '')
    this.onPortMouseup(this, portType)
  }

  /**
   * 开始拖拽
   * @private
   */
  _onGroupDragstart() {
    this._dragDeltaX = d3.event.x - this.x
    this._dragDeltaY = d3.event.y - this.y
  }

  /**
   * 正在拖拽
   * @private
   */
  _onGroupDrag() {
    this.x = d3.event.x - this._dragDeltaX
    this.y = d3.event.y - this._dragDeltaY
    this._group.raise().attr('transform', `translate(${this.x}, ${this.y})`)
    this.onDrag(this)
  }

  /**
   * 点击当前元素
   */
  _onClick() {
    d3.event.stopPropagation()
    this._group.classed('active', true)
    this.onClick(this)
  }

  /**
   * 双击当前元素
   */

  /**
   * 鼠标按钮在元素位置抬起
   * @private
   */
  _onMouseup() {
    d3.event.stopPropagation()
    this.onMouseup(this)
  }
}
export default Item
