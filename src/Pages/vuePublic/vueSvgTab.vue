<template>
  <div>
    <el-row>
      <el-col :span="12">
        <svg :width="svg_width" :height="svg_height" @mousemove="listener($event)">
          <a :href="tag.href" v-for="tag in tags">
            <text :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
          </a>
        </svg>
      </el-col>
      <el-col :span="12">
        <canvas width="600" height="350" id="myTag">
          <p>Anything in here will be replaced on browsers that support the canvas element</p>
        </canvas>
        <div id="tags">
          <ul>
            <li v-for="(text,index) in textData" :key="index"><a href="#" style="font-size:30px;">{{text}}</a></li>
            <!-- <li><a href="#">U </a></li>
            <li><a href="#">客户经理角色认知</a></li>
            <li><a href="#">PM角色</a></li>
            <li><a href="#">维修</a></li>
            <li><a href="#">信息安全</a></li>
            <li><a href="#">UMTS OMSTAR </a></li>
            <li><a href="#">客户经理角色认知</a></li>
            <li><a href="#">PM角色</a></li>
            <li><a href="#">维修</a></li> -->
          </ul>
        </div>
        <div id="iconTags">
          <a href="#01" onclick="return tpu(this)"><img src="static/images/icon33.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list4.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/icon33.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list3.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list6.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list8.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list8.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list8.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list8.png" alt="Icon 01"></a>
          <a href="#01" onclick="return tpu(this)"><img src="static/images/list8.png" alt="Icon 01"></a>
        </div>
        <div>
          <el-button type="warning" @click="changetags('tags')">开始</el-button>
          <el-button type="primary" @click="changetags('iconTags')">图片</el-button>
        </div>
        <br>
        <br>
        <br>
        <div>
          <el-button type="warning" @click="changeshape('hcylinder')">上旋转</el-button>
          <el-button type="primary" @click="changeshape('vcylinder')">左旋转</el-button>
          <el-button type="primary" @click="changeshape('hring')">图片</el-button>
          <el-button type="primary" @click="changeshape('iconTags')">图片</el-button>

        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>

    <br>
    <br>
    <br>

  </div>
</template>
<script>
import $ from 'jquery'
import 'jquery-tagcanvas'
export default {
  name: "vueSvgTab",
  data() {
    return {
      ttags: 'taglist',
      shape: "sphere",
      lock: null,
      textData: ['荀攸','贾诩','郭嘉','程昱','戏志才','刘晔','蒋济','陈群','华歆','钟繇','满宠','董昭','王朗','崔琰','毛玠','杜畿','田畴','王修','杨修','辛毗','杨阜','田豫','王粲','蒯越','张继','杜袭','枣祗','任峻','陈矫'],



      svg_falg: false,
      clear_timer: null, //定时器开关
      svg_width: 700, //svg宽度
      svg_height: 700, //svg高
      tagsNum: 20,//标签数量
      RADIUS: 200,//球的半径
      speedX: Math.PI / 360,//球一帧绕x轴旋转的角度
      speedY: Math.PI / 360,//球-帧绕y轴旋转的角度
      tags: []


    }
  },
  computed: {
    CX() {//球心x坐标
      return this.svg_width / 2;
    },
    CY() {//球心y坐标
      return this.svg_height / 2;
    }
  },
  created() {
    let tags = [];
    // this.tagsNum 把数据替换成我们需要的数据
    for (let i = 0; i < this.tagsNum; i++) {
      let tag = {};
      let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
      let a = Math.acos(k);
      let b = a * Math.sqrt(this.tagsNum * Math.PI)//计算标签相对于球心的角度
      tag.text = i + 'tag';
      tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b);//根据标签角度求出标签的x,y,z坐标
      tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b);
      tag.z = this.RADIUS * Math.cos(a);
      tag.href = 'https://www.baidu.com/';//给标签添加链接
      tags.push(tag);
    }
    this.tags = tags;//让vue替我们完成视图更新
  },
  methods: {
    //旋转方法
    rotateX(angleX) {
      var cos = Math.cos(angleX);
      var sin = Math.sin(angleX);
      for (let tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY;
        var z1 = tag.z * cos + (tag.y - this.CY) * sin;
        tag.y = y1;
        tag.z = z1;
      }
    },
    rotateY(angleY) {
      var cos = Math.cos(angleY);
      var sin = Math.sin(angleY);
      for (let tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
        var z1 = tag.z * cos + (tag.x - this.CX) * sin;
        tag.x = x1;
        tag.z = z1;
      }
    },
    //开始定时器
    setTime() {
      this.clear_timer = setInterval(() => {
        this.rotateX(this.speedX);
        this.rotateY(this.speedY);
      }, 17)
    },
    //鼠标移入
    listener(event) {//响应鼠标移动
      let _this = this
      var x = event.clientX - this.CX;
      var y = event.clientY - this.CY;
      this.speedX = x * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, x * 0.0001) : Math.max(-this.RADIUS * 0.00002, x * 0.0001);
      this.speedY = y * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, y * 0.0001) : Math.max(-this.RADIUS * 0.00002, y * 0.0001);
    },
    // listenerOne(event) {
    //   if (this.svg_falg) {
    //     this.setTime()
    //     this.svg_falg = false
    //   }

    // },
    // elementBMouseLeave(event) {
    //   clearInterval(this.clear_timer);
    //   this.svg_falg = true
    // }

    //设置动画
    restart() {
      TagCanvas.shape = this.shape;
      TagCanvas.lock = this.lock;
      TagCanvas.Start('myTag', this.ttags);
    },
    //开始动画
    changetags(params) {
      this.ttags = params;
      this.restart();
    },
    //控制旋转方向
    changeshape(s) {
      var locks = { hcylinder: 'x', vcylinder: 'y', hring: 'x', vring: 'y', sphere: '' };
      this.lock = locks[s] || '';
      this.shape = s;
      TagCanvas.initial = (this.lock == 'x' && [0, 0.2]) || (this.lock == 'y' && [0.2, 0]) || [0.2, 0.2];
      this.restart();
    }
  },
  mounted() {//使球开始旋转
    this.setTime()



    //插件应用 
    // 文档  http://www.goat1000.com/tagcanvas-functions.php

    //第一种显示方式
    TagCanvas.Start('myTag', 'tags', {
      initial: [.05, 0],
      shape: "sphere",
      lock: "y",
      textHeight: 17,
      radiusX: 1.5,
      radiusY: .6,
      radiusZ: 1.5,
      textColour: "#489ffc",
      outlineColour: "#3e97f5",
      reverse: !0,
      depth: .8,
      imageAlign: !0,
      wheelZoom: !1,
      minSpeed: .01,
      maxSpeed: .05
    });
    //第二种显示方式
    // $('#myTag').tagcanvas({
    //     textFont: 'Impact,Arial Black,sans-serif',
    //     textHeight: 20,
    //     maxSpeed: 0.1,
    //     decel: 0.9,
    //     depth: 0.99,
    //     outlineColour: '#f6f',
    //     outlineThickness: 3,
    //     pulsateTo: 0.2,
    //     pulsateTime: 0.5,
    //     wheelZoom: false
    // }, 'tags')

    // TagCanvas.Start('myTag');
  },

}
</script>

