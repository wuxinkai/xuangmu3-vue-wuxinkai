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
      width: '',
      height: '',
      cube: [],
      scene: [],
      camera: {},
      renderer: {},
    };
  },
  mounted() {
    this.initScene()
    this.initThree()
    this.initObject()
    this.render()
  },
  methods: {
    //初始化场景
    initScene() {
      this.scene = new THREE.Scene()
    },
    //初始化画布
    initThree() {
      this.width = document.getElementById("canvas-frame").clientWidth;
      this.height = document.getElementById("canvas-frame").clientHeight;
      this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor("#FFFFFF")
      this.renderer.setSize(this.width, this.height)
      document.getElementById("canvas-frame").appendChild(this.renderer.domElement)
    },
    //初始化我们的物体
    initObject() {
      // 几何体 CubeGeometry(长度,宽度,高度);
      var geometry = new THREE.CubeGeometry(1, 1, 1)
      //材质赋颜色 或者赋纹理
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // 讲内容 装进里面
      this.cube = new THREE.Mesh(geometry, material)
      this.scene.add(this.cube)
      // 物体大小
      this.camera.position.z = 5;
      // this.camera.position.y = 5;
      // this.camera.position.x = 5;
      //辅助工具 增加x y z轴
      var axisHelper = new THREE.AxisHelper(3)
      this.scene.add(axisHelper)
    },

    render() {
      // 自己调用自己的回调函数
      requestAnimationFrame(this.render);
      this.cube.rotation.x += 0.1;
      this.cube.rotation.y += 0.1;
      this.cube.rotation.z -= 0.1;
      this.renderer.render(this.scene, this.camera)
    }

  }
}
</script>
<style>
#canvas-frame {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #fff;
}
</style>