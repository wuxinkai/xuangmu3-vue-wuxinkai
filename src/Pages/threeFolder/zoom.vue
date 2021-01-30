<template>
  <div>
    <div id="canvas-frame"></div>
  </div>
</template>
<script>
import * as THREE from 'three';
import * as DAT from 'dat.gui';

export default {
  data() {
    return {
      renderer: [],
      camera: [],
      scene: [],
      light: [],
      cube: [],
      text: [],
       mesh: [],
      width: '',
      height: ''
    };
  },
  mounted(){
    this.threeStart()
  },
  methods: {
    //初始化画布
    initThree() {
      this.width = document.getElementById("canvas-frame").clientWidth;
      this.height = document.getElementById("canvas-frame").clientHeight;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(this.width, this.height);
      document.getElementById("canvas-frame").appendChild(this.renderer.domElement);
      this.renderer.setClearColor(0xFFFFFF, 1.0)
    },
    //初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 600;
      // this.camera.up.x = 0;
      // this.camera.up.y = 1;
      // this.camera.up.z = 0;
      // this.camera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0,
      // })
    },

    initScene() {
      this.scene = new THREE.Scene();
    },

    initLight() {
      this.light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
      this.light.position.set(100, 100, 200);
      this.scene.add(this.light)
    },

    //物体
    initObject() {
      let geometry = new THREE.CylinderGeometry(70, 100, 200);
      let material = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF
      })
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position = new THREE.Vector3(0, 0, 0);
      this.scene.add(this.mesh);
    },

    //
    createUI() {
      var FizzyText = function () {
        this.fov = 45;
      }
      this.text = new FizzyText();
      var gui = new DAT.GUI();
      gui.add(this.text, "fov", 0, 180).name("视角大小")
    },

    animation() {
      this.changeFov();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animation)
    },

    setCameraFov(fov) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    },

    changeFov() {
      this.setCameraFov(this.text.fov)
    },


    //执行代码
    threeStart() {
      this.initThree();
      this.initCamera();
      this.initScene();
      this.initLight();
      this.initObject();
      this.createUI();
      this.animation();
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
  background-color: #eeeeee;
}

.dg.ac{
  position: fixed;
    top: 140px;
    left: 0;
    right: 30px;
    height: 0;
    z-index: 0;
}
</style>