//设置元素
export function clientHeight2(item, number) {
  let clientHeight = document.documentElement.clientHeight
  item.style.height = (clientHeight - (number || 0)) + 'px'
  window.onresize = function () {
    clientHeight = document.documentElement.clientHeight
    item.style.height = (clientHeight - (number || 0)) + 'px'
  }
}
//设置表格高度 前端无法监听数据变化
// export function tableHeights(number) {
//   let tableHeight = document.documentElement.clientHeight - (number || 0)
//   window.onresize = function () {
//     tableHeight = document.documentElement.clientHeight - (number || 0)
//   }
//   return tableHeight
// }
