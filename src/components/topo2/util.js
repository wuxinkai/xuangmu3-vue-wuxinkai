/** 
 * 工具
 * @tate 2018年11月29 
 * 
 * 知识点：(1)生成随机数 (2) 设置文字宽度
 */

/**
 * 随机id 
 */
let makeId = function () {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 10; i++) {
    //charAt() 方法可返回指定位置的字符。
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text;
  //var a=Math.floor(0.60); 结果 5
  // var d=Math.floor(5.1);  结果 5
  // var e=Math.floor(-5.1);  结果 -6
  // random() 方法可返回介于 0 ~ 1 之间的一个随机数
}

//读取文字的个数
let getTextWidth = function (text) {
  let i = text.length;
  let width = 0;
  while (i) {
    let char = text.charAt(i - 1) // i是几 获取的就是几
    if (char.charCodeAt() > 126) { //Unicode编码返回的是随机数范围内
      width += 13
    } else {
      width += 13
    }
    i--
  }
  return width
}

export {
  makeId,
  getTextWidth
}
