<template>
  <div>
    <div id="canvas-frame"></div>
  </div>
</template>

<script>
import * as THREE from "three";
// 监控动画
import Stats from "stats-js";
import TWEEN from 'tween.js' 
export default {
  data() {
    return {
      width: "",
      height: "",
      renderer: [],
      stats: "",
      scene: [],
      mesh: [],
      camera: [],
      light: []
    };
  },
  mounted() {
    this.threeStart()
  },
  methods: {
    //初始化画布
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
      //从新设置画布背景色，
      this.renderer.setClearColor(0xFFFFFF, 1.0);
     
      this.stats = new Stats();
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.left = "0px";
      this.stats.domElement.style.top = "0px";
      document
        .getElementById("canvas-frame")
        .appendChild(this.stats.domElement);
    },
    //初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        1,
        10000
      );
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 600;
      this.camera.up.x = 0;
      this.camera.up.y = 1;
      this.camera.up.z = 0;
      // this.camera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0
      // });
    },

    //
    initScene() {
      this.scene = new THREE.Scene();
    },

    //
    initLight() {
      this.light = new THREE.AmbientLight(0xFF0000);
      this.light.position.set(100, 100, 200);
      this.scene.add(this.light);
    },

    initObject() {
      var geometry = new THREE.BoxGeometry(200, 200, 200);
      var material = new THREE.MeshLambertMaterial({color:0xFFFFFF});
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position = new THREE.Vector3(0, 0, 0);
      this.scene.add(this.mesh);
    },
    //
    initTween() {
      new TWEEN.Tween(this.camera.position)
        .to({ x: 400 }, 3000)
        .repeat(Infinity) //可以写数字，从0开始
        .start();
    },
    //
    animation() {
      this.renderer.render(this.scene,this.camera)
      requestAnimationFrame(this.animation)
      console.log(this.stats);
      this.stats.update()
      //更新坐标轴
      TWEEN.update()
    },

    //
    threeStart() {
      this.initThree();
      this.initCamera();
      this.initScene();
      this.initObject();
      this.initLight();
      this.initTween();
      this.animation();
    }
  }
};
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
