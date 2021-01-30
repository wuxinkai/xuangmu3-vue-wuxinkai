/**
 * 实现canvas向上漂浮烟花动效
 * 使用：外部页面引入当前JS 然后实例化类  并传入一个页面canvas对象  最后调用init方法
 * 参数说明：
 * selCanvas 要加载到的canvas对象名称
 * num 烟花数量
 * tail 烟花尾巴长度
 * 
 */

class Fireworks {
  constructor(selCanvas, num, tail) {
    this.af;
    this.numLasers = num;
    this.tail = tail;
    this.canvas = selCanvas;
    this.ctx = this.canvas.getContext("2d");
  }
  createLasers(n) {
    const lasers = [];
    for (let i = 0; i < n; ++i) {
      lasers.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        s: Math.random() * 10 + 1
      });
    }
    return lasers;
  }
  renderLaser(l) {
    const grad = this.ctx.createLinearGradient(l.x, l.y, l.x, l.y + this.tail);
    const a = 1 - ((this.canvas.height - l.y) / this.canvas.height) * 0.8;
    grad.addColorStop(0, `hsla(340,100%,100%,${a})`);
    grad.addColorStop(1, "hsla(340,100%,50%,0)");
    this.ctx.strokeStyle = grad;
    this.ctx.beginPath();
    this.ctx.moveTo(l.x, l.y);
    this.ctx.lineTo(l.x, l.y + this.tail);
    this.ctx.stroke();
  }
  updateLaser(l) {
    l.y -= l.s;
    if (l.y < -this.tail) {
      l.y = this.canvas.height;
    }
  }
  render(lasers) {
    this.ctx.fillStyle = "hsl(261,43%,7%)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let l of lasers) {
      this.renderLaser(l);
      this.updateLaser(l);
    }
    this.af = requestAnimationFrame(() => this.render(lasers));
  }
  init() {
    cancelAnimationFrame(this.af);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.render(this.createLasers(this.numLasers));
  }
}
export default Fireworks;
