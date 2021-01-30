<template>
  <div>

    <div id="canvas-frame"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  data() {
    return {
      width: 0,
      height: 0,
      scene: {},
      renderer: {},
      camera: {}
    };
  },
  mounted() {
    this.threeStart()
  },
  methods: {
    //（1）初始化 画布
    initThree() {
      this.width = document.getElementById("canvas-frame").clientWidth;
      this.height = document.getElementById("canvas-frame").clientHeight;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true //true抗锯齿
      });
      // 画布大小
      this.renderer.setSize(this.width, this.height);
      //把画布加入到，div#canvas-frame 中呈现出来
      document.getElementById("canvas-frame").appendChild(this.renderer.domElement);
      //从新设置画布背景色，setClearColor(背景色, 透明度)
      this.renderer.setClearColor(0xFFFFFF, 1.0);
    },

    //（2）初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
      this.camera.position.x = 0; //左右
      this.camera.position.y = 0; // 上下
      this.camera.position.z = 1000; //
    },

    // （3）初始化 场景
    initScene() {
      this.scene = new THREE.Scene();
    },

    //(4) 初始化灯光
    initLight() {
      let light;
      //设置有方向的光， 红色光  光的强度1.0
      light = new THREE.DirectionalLight(0XFF0000, 1.0, 0);
      //光照的 位置 x:100 y:100  z:200
      light.position.set(100, 100, 200);
      this.scene.add(light);
    },

    //（5）初始化我们的物体
    initObject() {
      let geometry = new THREE.Geometry()
      //材质 是线性的LineBasicMaterial ，
      let material = new THREE.LineBasicMaterial({
        vertexColors: true, //是否使用顶点颜色，
        // color:0x00FF00
      })
      //设置颜色
      var color1 = new THREE.Color(0x444444),
        color2 = new THREE.Color(0xFF0000),
        color3 = new THREE.Color(0x00FF00)

      //设置点的位置， 线的材质可以由2点的颜色决定  Vector3 就是创造点
      var p1 = new THREE.Vector3(-100, 0, 100);
      var p2 = new THREE.Vector3(100, 0, -100);
      var p3 = new THREE.Vector3(0, -100, 0)
      geometry.vertices.push(p1);
      geometry.vertices.push(p2);
      geometry.vertices.push(p3);
      geometry.vertices.push(p1);
      //每个点对应的 两个颜色 , 四个点画了一个三角形
      geometry.colors.push(color1, color2, color3,color1);
      //LineSegments 两点项链
      //  LineStrip  
      //  LinePieces  四个点连成两条线
      var line = new THREE.Line(geometry, material, THREE.LineSegments);
      this.scene.add(line);

    },

    //执行结果
    threeStart() {
      this.initThree()
      //初始化相机
      this.initCamera()
      //初始化 场景
      this.initScene()
      //初始化灯光
      this.initLight()
      //初始化物体
      this.initObject()
      //清楚画布
      this.renderer.clear();
      //从新渲染画布
      this.renderer.render(this.scene, this.camera);
    }
  },
}
</script>
<style>
#canvas-frame {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #eeeeee;
}
</style>
