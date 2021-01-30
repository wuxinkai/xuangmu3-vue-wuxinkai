import * as THREE from "three";
import {Reflector} from 'three/examples/jsm/objects/Reflector.js';

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass.js";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass.js";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass.js";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader.js";

import Stats from "three/examples/jsm/libs/stats.module.js";

import OrbitControls from "./controls/MyOrbitControls";

import {Particles} from "./particles/Particles";
import {GradientParticles} from "./particles/GradientParticles";
import {SpriteCloud} from "./particles/SpriteClould";

import PGL from "./PUnits";
import {} from "./CustomFunction.js";
import {level1} from "./defaultConfig";

/**
 * 场景创建类
 * @param config 场景配置
 * @param options 功能配置
 *  container: 挂载点
 *  enabledClick：控制是否开启射线拾取 true
 */
function Scene3D(config, options) {
  this.options = options || {};

  this.container = this.options.container !== undefined ? this.options.container : null;
  this.enabledClick = this.options.enabledClick !== undefined ? this.options.enabledClick : true;

  // 状态机
  this.states = new PGL.States();
  this.states.init(config);

  // 模型加载器
  this.loaders = new PGL.Loaders(this.states);
  // 模型修改管理
  this.model = new PGL.Model(this.states);
  // 管理渐变对象
  this.materialGradients = new PGL.MaterialGradients();

  // 时钟
  this.clock = new THREE.Clock();

  // 保存标签dom
  this.labelItems = [];

  // 控制面板
  this.GUI = new PGL.GUI();

  this.init();
}

Object.assign(Scene3D.prototype, {
  /***************** 场景相关方法 start ************************************/
  init: function() {
    var _this = this;

    // 设置标签项
    this._setLabelItems();

    // 功能项
    if (this.states.config.functionItem.enableGUI) {
      this.initGUI();
    }
    if (this.states.config.functionItem.enabledStats) {
      this.initStats();
    }

    this.initWebGLRenderer();
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initOrbitControls();

    this.initObject();

    this.initEvent();

    this.animate = function() {
      requestAnimationFrame(_this.animate);

      // 更新控制器
      _this.orbitControls.update();

      if (_this.stats) {
        _this.stats.update();
      }

      var timer = _this.clock.getDelta();
      _this.model.updateAnimation(timer);

      if (_this.materialGradients) {
        _this.materialGradients.updateObject(_this.clock.getElapsedTime());
      }
      if (_this.labels_3d) {
        _this.labels_3d.update(_this.clock.getElapsedTime());
      }
      if (_this.modelLabels) {
        _this.modelLabels.update(_this.clock.getElapsedTime());
      }

      // 更新标签的位置
      _this._updateLabelItems();

      // 更新流线
      if (_this.streamlines) {
        _this.streamlines.update();
      }

      _this.render();
    };
    this.animate();

    // 管理材质
    this.materialController = new PGL.MaterialController(this.scene);
    this.customFunction = new PGL.CustomFunction(this.states, this);

    // 流线管理
    this.streamlines = new PGL.Streamlines(this.scene, this.states);

    // 射线摄取
    this.rayControls = new PGL.RayControls(this.camera, this.scene, {
      domElement: this.webGLRenderer.domElement,
      enabledClick: this.enabledClick
    });
    this.rayControls.selectFirstObjectCallBack = function(object) {
      if (object) {
        _this.clickMesh(object.object);
      }

      _this.customFunction.renderFunc(object);

      _this.selectFirstObjectCallBack(object);
    };

    // 场景中的材质
    this.sceneMaterials = new PGL.SceneMaterials(this.scene, this.states);
  },

  initWebGLRenderer: function() {

    var toneMappingOptions = {
      None: THREE.NoToneMapping,
      Linear: THREE.LinearToneMapping,
      Reinhard: THREE.ReinhardToneMapping,
      Uncharted2: THREE.Uncharted2ToneMapping,
      Cineon: THREE.CineonToneMapping,
      ACESFilmic: THREE.ACESFilmicToneMapping
    };

    var webGLRenderConfig = this.states.config.webGLRenderer;

    if (!this.webGLRenderer) {
      this.webGLRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      this.webGLRenderer.gammaInput = true;
      this.webGLRenderer.gammaOutput = true;
      this.webGLRenderer.domElement.style.position = "relative";
      this.webGLRenderer.toneMappingExposure = 1.0;
      this.webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
    this.webGLRenderer.setClearAlpha(webGLRenderConfig.alpha);
    this.webGLRenderer.toneMapping = toneMappingOptions[webGLRenderConfig.toneMapping];
    this.webGLRenderer.toneMappingExposure = webGLRenderConfig.toneMappingExposure;
    this.webGLRenderer.shadowMap.enabled = webGLRenderConfig.enableShadow;

    // 添加刨切
    if (webGLRenderConfig.globalClipping) {
      var globalPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1);
      this.webGLRenderer.clippingPlanes = [globalPlane];
    } else {
      this.webGLRenderer.clippingPlanes = [];
    }

    // 设置背景
    if (webGLRenderConfig.zIndex) {
      this.webGLRenderer.domElement.style.position = "relative";
      this.webGLRenderer.domElement.style.zIndex = webGLRenderConfig.zIndex;
    }
    if (this.container) {
      this.webGLRenderer.setSize(this.getWidth(), this.getHeight());
      this.container.appendChild(this.webGLRenderer.domElement);
    }

    if (this.GUI.gui) {
      let _this = this;

      var param = {
        toneMapping: webGLRenderConfig.toneMapping,
        exposure: webGLRenderConfig.toneMappingExposure,
        enableShadow: webGLRenderConfig.enableShadow,
      };
      var sceneController = this.GUI.gui.addFolder("场景控制");
      sceneController.add(param, "toneMapping", Object.keys(toneMappingOptions)).name("类型").onChange(function(val) {
        _this.changeToneMapping(val);
      });
      sceneController.add(param, "exposure", 0, 10).name("色调").onChange(function(val) {
        _this.changeToneMappingExposure(val);
      });
      sceneController.add(param, "enableShadow").name("开启阴影").onChange(function(val) {
        _this.enableShadow(val);
      });
    }
  },

  /**
   * 修改色调类型
   * @param type 色调类型
   */
  changeToneMapping: function(type) {
    var toneMappingOptions = {
      None: THREE.NoToneMapping,
      Linear: THREE.LinearToneMapping,
      Reinhard: THREE.ReinhardToneMapping,
      Uncharted2: THREE.Uncharted2ToneMapping,
      Cineon: THREE.CineonToneMapping,
      ACESFilmic: THREE.ACESFilmicToneMapping
    };

    let searchObject = new PGL.SearchObject();

    this.webGLRenderer.toneMapping = toneMappingOptions[type]; // to allow for very bright scenes.
    searchObject.findAllMesh(this.scene, function(mesh) {
      mesh.material.needsUpdate = true;
    });
    this.states.config.webGLRenderer.toneMapping = type;
  },
  /**
   * 修改色调
   * @param val
   */
  changeToneMappingExposure: function(val) {
    this.webGLRenderer.toneMappingExposure = val; // to allow for very bright scenes.
    this.states.config.webGLRenderer.toneMappingExposure = val;
  },
  enableShadow: function(val) {
    this.webGLRenderer.shadowMap.enabled = val; // to allow for very bright scenes.
    this.states.config.webGLRenderer.enableShadow = val;
  },

  /**
   * 初始化场景
   */
  initScene: function() {
    this.scene = new THREE.Scene();

    this.sceneBackground = new PGL.SceneBackground(this.scene, this.states);
    this._updateScene();

    // this.scene.fog = new THREE.Fog(0xffffff, 0, 1200);
    // var axes = new THREE.AxesHelper(100);
    // this.scene.add(axes);

    // var dir = new THREE.Vector3(0, 1, 0);
    // dir.normalize();
    // var origin = new THREE.Vector3(10, 10, 10);
    // var length = 100;
    // var hex = 0xffff00;
    // var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    // this.scene.add(arrowHelper);
  },
  _updateScene: function() {
    this.sceneBackground.updateType();
    if (this.GUI.gui) {
      this.sceneBackground.enableGUI(this.GUI.gui);
    }
  },
  updateSceneBackground: function(backgroundConfig) {
    this.states.updateSceneBackgroundConfig(backgroundConfig);
    this.sceneBackground.updateType();
  },
  /***************** 场景相关方法 end ************************************/

  initCamera: function() {
    var cameraConfig = this.states.config.camera;
    if (!this.camera) {
      this.camera = new THREE.PerspectiveCamera(45, 2, 0.1, cameraConfig.far);
    } else {
      this.camera.far = cameraConfig.far;
      this.camera.aspect = this.getWidth() / this.getHeight();
      this.camera.updateProjectionMatrix();
    }

    this.camera.position.set(cameraConfig.position.x, cameraConfig.position.y, cameraConfig.position.z);
  },
  initOrbitControls: function() {
    var cameraConfig = this.states.config.camera;
    if (!this.orbitControls) {
      this.orbitControls = new OrbitControls(this.camera, this.webGLRenderer.domElement);
    }

    this.orbitControls.enableRotate = cameraConfig.enableRotate;
    this.orbitControls.enablePan = cameraConfig.enablePan;
    this.orbitControls.enableRotatePhi = cameraConfig.enableRotatePhi;
    this.orbitControls.enableZoom = cameraConfig.enableZoom;
    this.orbitControls.minDistance = cameraConfig.minDistance;
    this.orbitControls.maxDistance = cameraConfig.maxDistance;
    this.orbitControls.enableLimitPan = cameraConfig.enableLimitPan;
    this.orbitControls.target.set(cameraConfig.target.x, cameraConfig.target.y, cameraConfig.target.z);
    this.orbitControls.distance = function(radius) {
      // console.log(radius);
    };

    if (this.GUI.gui) {
      var scope = this;
      var params = {
        minDistance: cameraConfig.minDistance,
        maxDistance: 500,

        targetX: cameraConfig.target.x,
        targetY: cameraConfig.target.y,
        targetZ: cameraConfig.target.z,
        enableZoom: cameraConfig.enableZoom,
        enablePan: cameraConfig.enablePan,
        enableRotate: cameraConfig.enableRotate,
        enableRotatePhi: cameraConfig.enableRotatePhi,
        enableLimitPan: cameraConfig.enableLimitPan,
      };
      var cameraFolder = this.GUI.gui.addFolder("相机控制");
      cameraFolder.add(params, "minDistance", 0, cameraConfig.minDistance + 100).name("最小距离").onFinishChange(function(val) {
        scope.changeCameraMinDistance(val);
      });
      cameraFolder.add(params, "maxDistance", 1, 500).name("最大距离").onFinishChange(function(val) {
        scope.changeCameraMaxDistance(val);
      });
      cameraFolder.add(params, "targetX", 1, 50).name("视点x坐标").onChange(function(val) {
        scope.changeCameraTargetX(val);
      });
      cameraFolder.add(params, "targetY", 1, 50).name("视点y坐标").onChange(function(val) {
        scope.changeCameraTargetY(val);
      });
      cameraFolder.add(params, "targetZ", 1, 50).name("视点z坐标").onChange(function(val) {
        scope.changeCameraTargetZ(val);
      });
      cameraFolder.add(params, "enableZoom").name("禁用缩放").onChange(function(val) {
        scope.changeCameraEnableZoom(val);
      });
      cameraFolder.add(params, "enablePan").name("开启移动").onChange(function(val) {
        scope.changeCameraEnablePan(val);
      });
      cameraFolder.add(params, "enableRotate").name("开启旋转").onChange(function(val) {
        scope.changeCameraEnableRotate(val);
      });
      cameraFolder.add(params, "enableRotatePhi").name("开启上下旋转").onChange(function(val) {
        scope.changeCameraEnableRotatePhi(val);
      });
      cameraFolder.add(params, "enableLimitPan").name("限制移动范围").onChange(function(val) {
        scope.changeCameraEnableLimitPan(val);
      });
    }
  },
  _updateCamera: function() {
    this.initCamera();
    this.initOrbitControls();
  },
  /**
   * 同步相机配置
   * @private
   */
  _sysCameraConfig: function() {
    var cameraConfig = this.states.config.camera;
    cameraConfig.position.x = this.camera.position.x;
    cameraConfig.position.y = this.camera.position.y;
    cameraConfig.position.z = this.camera.position.z;
    cameraConfig.far = this.camera.far;
  },

  changeCameraMinDistance: function(val) {
    this.orbitControls.minDistance = val;
    this.states.config.camera.minDistance = val;
  },
  changeCameraMaxDistance: function(val) {
    this.orbitControls.maxDistance = val;
    this.states.config.camera.maxDistance = val;
  },
  changeCameraTargetX: function(val) {
    this.orbitControls.target.setX(val);
    this.states.config.camera.target.x = val;
  },
  changeCameraTargetY: function(val) {
    this.orbitControls.target.setY(val);
    this.states.config.camera.target.y = val;
  },
  changeCameraTargetZ: function(val) {
    this.orbitControls.target.setZ(val);
    this.states.config.camera.target.z = val;
  },
  changeCameraEnableZoom: function(val) {
    this.orbitControls.enableZoom = val;
    this.states.config.camera.enableZoom = val;
  },
  changeCameraEnablePan: function(val) {
    this.orbitControls.enablePan = val;
    this.states.config.camera.enablePan = val;
  },
  changeCameraEnableRotate: function(val) {
    this.orbitControls.enableRotate = val;
    this.states.config.camera.enableRotate = val;
  },
  changeCameraEnableRotatePhi: function(val) {
    this.orbitControls.enableRotatePhi = val;
    this.states.config.camera.enableRotatePhi = val;
  },
  changeCameraEnableLimitPan: function(val) {
    this.orbitControls.enableLimitPan = val;
    this.states.config.camera.enableLimitPan = val;
  },

  /***************** 灯光 start ******************************************/
  initLight: function() {
    var lightSettingConfig = this.states.config.lightSetting;

    // 管理灯光
    this.manageLight = this.manageLight || new PGL.ManageLight(this.scene);
    this.manageLight.addAmbientLight(lightSettingConfig.ambientLight, this.GUI);
    this.manageLight.addSpotLight(lightSettingConfig.spotLight, this.GUI);
    this.manageLight.addDirectionalLight(lightSettingConfig.directionalLight, this.GUI);
    this.manageLight.addPointLight(lightSettingConfig.pointLight, this.GUI);
  },

  changeAmbientLight: function(prop, val) {
    if (!this.manageLight.ambientLight) {
      this.manageLight.addAmbientLight(this.states.config.lightSetting.ambientLight, this.GUI, true);
    }
    switch(prop){
      case "color":
        this.manageLight.ambientLight[prop].set(val);
        this.states.config.lightSetting.ambientLight[prop] = this.manageLight.ambientLight[prop].getHex();
        break;
      case 'intensity':
        this.manageLight.ambientLight[prop] = val;
        this.states.config.lightSetting.ambientLight[prop] = val;
        break;
      default:
        console.log("属性未处理" + prop);
    }
  },

  changeSpotLight: function(prop, val) {
    if (!this.manageLight.spotLight) {
      this.manageLight.addSpotLight(this.states.config.lightSetting.spotLight, this.GUI, true);
    } else if (!this.manageLight.spotLightHelper) {
      this.manageLight.addSpotLightHelper();
    }
    switch(prop){
      case "color":
        this.manageLight.spotLight[prop].set(val);
        this.states.config.lightSetting.spotLight[prop] = this.manageLight.spotLight[prop].getHex();
        break;
      case 'intensity':
      case 'distance':
      case 'angle':
      case 'penumbra':
      case 'decay':
      case 'castShadow':
        this.manageLight.spotLight[prop] = val;
        this.states.config.lightSetting.spotLight[prop] = val;
        this.manageLight.spotLightHelper.update();
        break;
      case 'position':
        if (val.x) {
          this.manageLight.spotLight[prop].setX(val.x);
          this.states.config.lightSetting.spotLight[prop].x = val.x;
        }
        if (val.y) {
          this.manageLight.spotLight[prop].setY(val.y);
          this.states.config.lightSetting.spotLight[prop].y = val.y;
        }
        if (val.z) {
          this.manageLight.spotLight[prop].setZ(val.z);
          this.states.config.lightSetting.spotLight[prop].z = val.z;
        }
        this.manageLight.spotLightHelper.update();
        break;
      case 'target':
        if (val.x) {
          this.manageLight.spotLight[prop].position.setX(val.x);
          this.states.config.lightSetting.spotLight[prop].x = val.x;
        }
        if (val.y) {
          this.manageLight.spotLight[prop].position.setY(val.y);
          this.states.config.lightSetting.spotLight[prop].y = val.y;
        }
        if (val.z) {
          this.manageLight.spotLight[prop].position.setZ(val.z);
          this.states.config.lightSetting.spotLight[prop].z = val.z;
        }
        this.manageLight.spotLight.target.updateMatrixWorld();
        this.manageLight.spotLightHelper.update();
        break;
      default:
        console.log("属性未处理" + prop);
    }
  },

  changeDirectionalLight: function(prop, val) {
    if (!this.manageLight.directionalLight) {
      this.manageLight.addDirectionalLight(this.states.config.lightSetting.directionalLight, this.GUI, true);
    } else if (!this.manageLight.directionalLightHelper) {
      this.manageLight.addDirectionalLightHelper();
    }
    switch(prop){
      case "color":
        this.manageLight.directionalLight[prop].set(val);
        this.states.config.lightSetting.directionalLight[prop] = this.manageLight.directionalLight[prop].getHex();
        break;
      case 'intensity':
      case 'castShadow':
        this.manageLight.directionalLight[prop] = val;
        this.states.config.lightSetting.directionalLight[prop] = val;
        this.manageLight.directionalLightHelper.update();
        break;
      case 'position':
        if (val.x) {
          this.manageLight.directionalLight[prop].setX(val.x);
          this.states.config.lightSetting.directionalLight[prop].x = val.x;
        }
        if (val.y) {
          this.manageLight.directionalLight[prop].setY(val.y);
          this.states.config.lightSetting.directionalLight[prop].y = val.y;
        }
        if (val.z) {
          this.manageLight.directionalLight[prop].setZ(val.z);
          this.states.config.lightSetting.directionalLight[prop].z = val.z;
        }
        this.manageLight.directionalLightHelper.update();
        break;
      case 'target':
        if (val.x) {
          this.manageLight.directionalLight[prop].position.setX(val.x);
          this.states.config.lightSetting.directionalLight[prop].x = val.x;
        }
        if (val.y) {
          this.manageLight.directionalLight[prop].position.setY(val.y);
          this.states.config.lightSetting.directionalLight[prop].y = val.y;
        }
        if (val.z) {
          this.manageLight.directionalLight[prop].position.setZ(val.z);
          this.states.config.lightSetting.directionalLight[prop].z = val.z;
        }
        this.manageLight.directionalLight.target.updateMatrixWorld();
        this.manageLight.directionalLightHelper.update();
        break;
      default:
        console.log("属性未处理" + prop);
    }
  },

  changePointLight: function(prop, val) {
    if (!this.manageLight.pointLight) {
      this.manageLight.addPointLight(this.states.config.lightSetting.pointLight, this.GUI, true);
    } else if (!this.manageLight.pointLightHelper) {
      this.manageLight.addPointLightHelper();
    }
    switch(prop){
      case "color":
        this.manageLight.pointLight[prop].set(val);
        this.states.config.lightSetting.pointLight[prop] = this.manageLight.pointLight[prop].getHex();
        break;
      case 'intensity':
      case 'distance':
      case 'decay':
      case 'castShadow':
        this.manageLight.pointLight[prop] = val;
        this.states.config.lightSetting.pointLight[prop] = val;
        this.manageLight.pointLightHelper.update();
        break;
      case 'position':
        if (val.x) {
          this.manageLight.pointLight[prop].setX(val.x);
          this.states.config.lightSetting.pointLight[prop].x = val.x;
        }
        if (val.y) {
          this.manageLight.pointLight[prop].setY(val.y);
          this.states.config.lightSetting.pointLight[prop].y = val.y;
        }
        if (val.z) {
          this.manageLight.pointLight[prop].setZ(val.z);
          this.states.config.lightSetting.pointLight[prop].z = val.z;
        }
        this.manageLight.pointLightHelper.update();
        break;
      default:
        console.log("属性未处理" + prop);
    }
  },

  /***************** 性能测试 start ************************************/
  initStats: function() {
    if (!this.stats) {
      this.stats = new Stats();
    }
    if (this.container) {
      this.container.appendChild(this.stats.dom);
    }
    this.stats.dom.setAttribute("style", "position:absolute;z-index:999;");
  },
  /***************** 性能测试 start ************************************/

  /***************** 控制面板 start ************************************/
  initGUI: function() {
    this.GUI.createGUI();
    this.GUI.setContainer(this.container);

    // 初始化控制参数
    if (this.sceneBackground) {
      this.sceneBackground.initGUI();
    }
  },
  /***************** 控制面板 end ************************************/

  render: function() {
    if (this.composer) {
      this.composer.render();
    } else {
      this.webGLRenderer.render(this.scene, this.camera);
    }
  },
  /**
   * 切换三维挂载点
   * @param container 挂载点元素节点
   */
  updateContainer: function(container) {
    this.container = container;

    // 修改挂载点
    this.container.appendChild(this.webGLRenderer.domElement);
    if (this.GUI.gui) {
      this.GUI.setContainer(this.container);
    }

    // 设置标签
    this._setLabelItems();

    this.onWindowResize();

    // 钩子函数
    this.afterLoadModel = function(object) {
    };
    this.afterAddModel = function(object) {
    };

    this.selectFirstObjectCallBack = function() {
    };
  },
  initEvent: function() {
    var _onWindowResize = this._bind(this, this.onWindowResize);
    window.addEventListener("resize", _onWindowResize, false);
  },
  /***************************** 场景状态相关方法 start ************************************/
  /**
   * 同步状态与场景显示状态
   * @param config
   */
  synConfig: function(config) {

    // 更新模型配置
    if (config) {
      this.states.updateConfig(config);
    }

    // 初始化显示性能测试
    if (this.states.config.functionItem.enabledStats) {
      this.initStats();
    }

    // 控制面板
    if (this.states.config.functionItem.enableGUI) {
      this.initGUI();
    } else {
      this.GUI.destroy();
    }

    this.initWebGLRenderer();
    this._updateCamera();
    this.initLight();
    this._updateScene();
  },
  /**
   * 获取配置
   */
  getConfig: function() {
    // 同步相机位置到配置中
    this._sysCameraConfig();

    return this.states.config;
  },
  /**
   * 获取修改模型配置
   */
  getModelConfig: function() {
    return this.states.modelConfig;
  },
  /***************************** 场景状态相关方法 end ************************************/

  /***************************** 模型加载相关方法 start ************************************/
  initObject: function() {
    // 创建gltf加载器
    this.loadModel();
  },
  /**
   * 场景中添加模型
   */
  loadModel: function() {

    if (!this.states.checkModelConfig()) return;

    let _this = this;
    this.loaders.load(this.states.config.modelData, function(object) {

      _this.model.updateModel(object);

      if (_this.sceneMaterials) {
        _this.sceneMaterials.update(_this.model.model, _this.GUI.gui);
      }

      _this.afterLoadModel(object);

      _this.scene.add(_this.model.model);

      _this.afterAddModel(_this.model.model);
    });
  },
  /**
   * 15号机模型特殊处理
   * @param object
   */
  change15Model: function(object) {
    let _this = this;
    object.position.x += 15;
    object.position.y += 5;

    // Plane002
    let Plane002_color = 0x27739d;
    let Plane002_opacity = 0.6;

    let Plane002 = object.getObjectByName("Plane002");
    Plane002.children[0].material.color.setHex(Plane002_color);
    Plane002.children[0].material.opacity = Plane002_opacity;
    Plane002.children[0].material.needsUpdate = true;

    Plane002_color = Plane002.children[0].material.color.getHex();
    Plane002_opacity = Plane002.children[0].material.opacity;
    let Plane002_emissiveHex = Plane002.children[0].material.emissive.getHex();
    this.Plane002Mesh = Plane002.children[0];

    if (this.GUI.gui) {
      var param = {
        colorHex: Plane002_color,
        opacity: Plane002_opacity,
        emissiveHex: Plane002_emissiveHex
      };

      var Plane002Controller = this.GUI.gui.addFolder("Plane002");
      Plane002Controller.addColor(param, "colorHex").name("Plane002颜色").onChange(function(val) {
        _this.Plane002Mesh.material.color.setHex(val);
      });
      Plane002Controller.add(param, "opacity", 0.1, 1.0, 0.01).name("Plane002 opacity").onChange(function(val) {
        _this.Plane002Mesh.material.opacity = val;
      });
      Plane002Controller.addColor(param, "emissiveHex").name("Plane002 emissiveHex").onChange(function(val) {
        _this.Plane002Mesh.material.emissive.setHex(val);
      });
    }

    // Z_wangbu_1gangjia_mesh_001
    let Z_15_jiaobanchi_001_color = 0xb0d11;

    let Z_wangbu_1gangjia_mesh_001 = object.getObjectByName("Z_wangbu_1gangjia_mesh_001");
    Z_wangbu_1gangjia_mesh_001.children[0].children[0].material.color.setHex(Z_15_jiaobanchi_001_color);
    this.Z_wangbu_1gangjia_mesh_001 = Z_wangbu_1gangjia_mesh_001.children[0].children[0];

    let Z_15_jiaobanchi_001 = object.getObjectByName("Z_15_jiaobanchi_001");
    Z_15_jiaobanchi_001.children[0].children[0].material.color.setHex(
      Z_15_jiaobanchi_001_color
    );
    Z_15_jiaobanchi_001_color = Z_15_jiaobanchi_001.children[0].children[0].material.color.getHex();
    let Z_15_jiaobanchi_001_opacity =
      Z_15_jiaobanchi_001.children[0].children[0].material.opacity;
    let Z_15_jiaobanchi_001_emissive = Z_15_jiaobanchi_001.children[0].children[0].material.emissive.getHex();
    this.Z_15_jiaobanchi_001 = Z_15_jiaobanchi_001.children[0].children[0];

    if (this.GUI.gui) {
      var params = {
        colorHex1: Z_15_jiaobanchi_001_color,
        opacity1: Z_15_jiaobanchi_001_opacity,
        emissiveHex1: Z_15_jiaobanchi_001_emissive
      };

      var Z_15_jiaobanchi_001Controller = this.GUI.gui.addFolder("Z_15_jiaobanchi_001");
      Z_15_jiaobanchi_001Controller.addColor(params, "colorHex1").name("Z_15颜色").onChange(function(val) {
        _this.Z_15_jiaobanchi_001.material.color.setHex(val);
        _this.Z_wangbu_1gangjia_mesh_001.material.color.setHex(val);
      });
      Z_15_jiaobanchi_001Controller.add(params, "opacity1", 0.1, 1.0, 0.01).name("Z_15opacity").onChange(function(val) {
        _this.Z_15_jiaobanchi_001.material.opacity = val;
        _this.Z_wangbu_1gangjia_mesh_001.material.opacity = val;
      });
      Z_15_jiaobanchi_001Controller.addColor(params, "emissiveHex1").name("Z_15emissiveHex").onChange(function(val) {
        _this.Z_15_jiaobanchi_001.material.emissive.setHex(val);
        _this.Z_wangbu_1gangjia_mesh_001.material.emissive.setHex(val);
      });
    }

    // 呼吸灯材质
    let guangquan = object.getObjectByName("guangquan");
    this.materialGradients.addObject(guangquan, {
      r: 0.56,
      factorB: 0.3
    });
  },

  /**
   * 模型加载完成后触发
   * @param object 加载对象
   */
  afterLoadModel: function(object) {
  },
  /**
   * 模型添加到场景后触发
   * @param object 当前添加的模型
   */
  afterAddModel: function(object) {
  },

  /**
   * 删除当前场景中的模型、添加新模型
   * @param config 场景配置
   * @param modelConfig 模型初始化修改信息
   */
  changeModel: function(config, modelConfig) {
    // 更新模型配置
    this.states.updateConfig(config);
    // 更新模型修改配置
    this.states.updateModelConfig(modelConfig);

    // 清空场景
    this.cleanScene();

    // 清空流线
    this.removeALLStreamlines();

    // 同步场景配置
    this.synConfig();

    // 添加模型
    this.loadModel();
  },
  /**
   * 删除模型
   * @param object
   * @private
   */
  _disposeModel: function(object) {
    if (object.constructor === THREE.Mesh || object.constructor === Reflector) {
      object.geometry.dispose();
      PGL.MaterialController.prototype.disposeMaterial(object.material);
    } else {
      for (let i = 0; i < object.children.length; i++) {
        this._disposeModel(object.children[i]);
      }
    }
  },
  /**
   * 清空场景
   */
  cleanScene: function() {
    // 删除轮廓
    if (this.composer) {
      if (this.outlinePass) {
        this.outlinePass.dispose();
        this.outlinePass = null;
      }
      if (this.effectFXAA) {
        this.effectFXAA = null;
      }
      this.composer = null;
    }

    for (let i = 0; i < this.scene.children.length; i++) {
      if (this.scene.children[i].constructor === THREE.Scene
        || this.scene.children[i].constructor === THREE.Object3D
        || this.scene.children[i].constructor === THREE.Group
        || this.scene.children[i].constructor === THREE.Sprite
        || this.scene.children[i].constructor === Particles
        || this.scene.children[i].constructor === GradientParticles
        || this.scene.children[i].constructor === THREE.Mesh
        || this.scene.children[i].constructor === THREE.Points
        || this.scene.children[i].constructor === Reflector) {
        let object = this.scene.children[i];
        this.scene.remove(object);
        i--;
        this._disposeModel(object);
      }
    }
  },

  /**
   * 页面修改模型
   * @param modelConfig
   */
  updateModel: function(modelConfig) {
    this.states.updateModelConfig(modelConfig);
    this.model.updateModelAttribute();
  },
  /***************************** 模型加载相关方法 end ************************************/

  /***************************** 效果 start *********************************************/
  addOutlinePass: function(meshNames) {
    // postprocessing
    this.composer = new EffectComposer(this.webGLRenderer);
    var renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 通道
    this.outlinePass = new OutlinePass(new THREE.Vector2(this.webGLRenderer.domElement.width, this.webGLRenderer.domElement.height), this.scene, this.camera);
    this.composer.addPass(this.outlinePass);

    this.effectFXAA = new ShaderPass(FXAAShader);
    this.effectFXAA.uniforms['resolution'].value.set(1 / this.webGLRenderer.domElement.width, 1 / this.webGLRenderer.domElement.height);
    this.composer.addPass(this.effectFXAA);

    if (this.GUI.gui) {
      var params = {
        edgeStrength: 3.0,
        edgeGlow: 0.0,
        edgeThickness: 1.0,
        pulsePeriod: 0,
        rotate: false,
        usePatternTexture: false
      };
      let outlineControl = this.GUI.gui.addFolder("轮廓");
      outlineControl.add(params, 'edgeStrength', 0.01, 10).onChange(function(value) {
        outlinePass.edgeStrength = Number(value);
      });
      outlineControl.add(params, 'edgeGlow', 0.0, 1).onChange(function(value) {
        outlinePass.edgeGlow = Number(value);
      });
      outlineControl.add(params, 'edgeThickness', 1, 4).onChange(function(value) {
        outlinePass.edgeThickness = Number(value);
      });
      outlineControl.add(params, 'pulsePeriod', 0.0, 5).onChange(function(value) {
        outlinePass.pulsePeriod = Number(value);
      });

      var Configuration = function() {
        this.visibleEdgeColor = '#ffffff';
        this.hiddenEdgeColor = '#190a05';
      };
      var conf = new Configuration();
      outlineControl.addColor(conf, 'visibleEdgeColor').onChange(function(value) {
        outlinePass.visibleEdgeColor.set(value);
      });
      outlineControl.addColor(conf, 'hiddenEdgeColor').onChange(function(value) {
        outlinePass.hiddenEdgeColor.set(value);
      });
    }

    for (let i = 0; i < meshNames.length; i++) {
      let mesh = this.scene.getObjectByName(meshNames[i]);
      this.outlinePass.selectedObjects.push(mesh);
    }
  },

  addBloomPass: function() {
    // postprocessing
    this.composer = new EffectComposer(this.webGLRenderer);
    var renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 通道
    var params = {
      bloomStrength: 1.01,
      bloomThreshold: 0.54,
      bloomRadius: 0.3
    };
    let bloomPass = new UnrealBloomPass(new THREE.Vector2(this.webGLRenderer.domElement.width, this.webGLRenderer.domElement.height), params.bloomStrength, params.bloomRadius, params.bloomThreshold);
    this.composer.addPass(bloomPass);

    this.effectFXAA = new ShaderPass(FXAAShader);
    this.effectFXAA.uniforms['resolution'].value.set(1 / this.webGLRenderer.domElement.width, 1 / this.webGLRenderer.domElement.height);
    this.composer.addPass(this.effectFXAA);

    if (this.GUI.gui) {
      let bloomControl = this.GUI.gui.addFolder("泛光");
      bloomControl.add(params, 'bloomStrength', 0.0, 3.0).step(0.01).onChange(function(value) {
        bloomPass.strength = Number(value);
      });
      bloomControl.add(params, 'bloomThreshold', 0.0, 1.0).step(0.01).onChange(function(value) {
        bloomPass.threshold = Number(value);
      });
      bloomControl.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function(value) {
        bloomPass.radius = Number(value);
      });
    }
  },

  /**
   * 添加镜面
   * @param width 镜面宽度
   * @param height 镜面长度
   */
  addPlaneMirror: function(width, height) {
    var geometry = new THREE.PlaneBufferGeometry(width, height);
    var groundMirror = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: this.getWidth(),
      textureHeight: this.getHeight(),
      color: 0xc0c0c0,
      recursion: 0
    });
    groundMirror.rotateX(-Math.PI / 2);
    groundMirror.position.y = -20;
    this.scene.add(groundMirror);
  },

  /**
   * 添加波浪粒子效果
   * @param color 颜色
   */
  addWaves: function(color) {
    let particles = new Particles({
      color: new THREE.Color(color)
    });
    this.scene.add(particles);

    if (this.GUI.gui) {
      var param = {
        particles_color: color
      };

      var particesWaves = this.GUI.gui.addFolder("波浪效果");
      particesWaves.addColor(param, 'particles_color').name("颜色").onChange(function(val) {
        console.log();
        particles.material.uniforms["color"].value = new THREE.Color(val);
      });
    }
  },

  /**
   * 添加渐变粒子
   */
  addGradientParticles: function() {
    let gradientParticles = new GradientParticles();
    this.scene.add(gradientParticles);

    if (this.GUI.gui) {
      let params = {
        gradientParticles_color: 0x0419ff
      };

      var gradientParticlesControll = this.GUI.gui.addFolder("渐变效果");
      gradientParticlesControll.addColor(params, 'gradientParticles_color').name("颜色").onChange(function(val) {
        gradientParticles.material.uniforms["color"].value = new THREE.Color(val);
      });
    }
  },

  /**
   * 添加放射效果
   */
  addRadiation: function() {
    var spriteCloud = new SpriteCloud(this.scene);
    spriteCloud.start();
  },

  /**
   * 添加热力图绑定
   * @private
   */
  _bindHeat: function() {
    let btn = document.getElementsByClassName("heat").item(0);
    if (!btn) {
      return;
    }
    let heat_stu = true;
    let temp = []; // 保存请求的数据
    btn.onclick = function() {
      heat_stu = !heat_stu;
      if (!heat_stu) {
        // API.sa_SpringFactoryThermodynamicDiagramsView_queryFactoryTDData().then((res) => {
        //   if (res.status === 200) {
        //     temp = res.data.appdata.beans;
        //     model_heat(heat_stu, temp)
        //   }
        // })
      } else {
        model_heat(heat_stu, temp);
      }
    };

    let _this = this;

    function model_heat(heat_stu, temp_beans) {
      for (let i = 0; i < temp_beans.length; i++) {
        _this.heat_map(heat_stu, _this.color_filter(temp_beans[i].avg_value), temp_beans[i].image_name);
      }
    }
  },

  openCigaretteCase: function(tag) {
    let my013 = this.scene.getObjectByName("______013");
    let my011 = this.scene.getObjectByName("______011");

    let Cylinder028 = this.scene.getObjectByName("Cylinder028");
    let Cylinder027 = this.scene.getObjectByName("Cylinder027");

    if (tag) {
      if (!my013.userData.rotateX) {
        my013.rotateX(-Math.PI / 2);
        my013.userData.rotateX = true;
      }
      if (!my011.userData.rotateX) {
        my011.rotateX(-Math.PI / 2);
        my011.userData.rotateX = true;
      }
      if (!Cylinder028.userData.move) {
        Cylinder028.position.y += 8;
        Cylinder028.userData.move = true;
      }
      if (!Cylinder027.userData.move) {
        Cylinder027.position.y += 4;
        Cylinder027.userData.move = true;
      }
    } else {
      if (!!my013.userData.rotateX) {
        my013.rotateX(Math.PI / 2);
        my013.userData.rotateX = false;
      }
      if (!!my011.userData.rotateX) {
        my011.rotateX(Math.PI / 2);
        my011.userData.rotateX = false;
      }
      if (!!Cylinder028.userData.move) {
        Cylinder028.position.y -= 8;
        Cylinder028.userData.move = false;
      }
      if (!!Cylinder027.userData.move) {
        Cylinder027.position.y -= 4;
        Cylinder027.userData.move = false;
      }
    }
  },

  /**
   * 场景中添加流线
   */
  addStreamlines: function(lines, type) {
    this.streamlines.addStreamlines(lines, type);
  },
  /**
   * 删除所有的流线
   */
  removeALLStreamlines: function() {
    this.streamlines.removeALLStreamlines();
  },
  /***************************** 效果 end **********************************************/

  /***************************** 标签相关方法 start ************************************/
  /**
   * 选中开启线框
   * @param ruleForm
   *  Production: 产线（15号机名称）
   *  placeChildren：工业段
   *  typelabels: 类型
   */
  opening_tag: function(ruleForm) {
    let _this = this;
    let meshBasicMaterial = new THREE.MeshBasicMaterial({
      color: "#00DEFF",
      wireframe: true,
      wireframeLinecap: "butt "
    });

    // 获取15号机
    let industrial = this.scene.getObjectByName(ruleForm.Production);
    // 遍历15号机下的部位
    industrial.children.forEach(object => {
      // 恢复之前变换后的模型
      object.traverse(Mesh => {
        if (Mesh.type === "Mesh") {
          if (Mesh.userData.material) {
            Mesh.material = Mesh.userData.material;
          }
        }
      });

      // 工业段与产线名称相同，选中整个产线 || 修改选中工业段
      if (
        ruleForm.Production === ruleForm.placeChildren ||
        object.name.indexOf(ruleForm.placeChildren) === 0
      ) {
        object.traverse(Mesh => {
          if (Mesh.type === "Mesh") {
            Mesh.userData.material = Mesh.material;
            Mesh.material = meshBasicMaterial;
          }
        });

        _this._setLabelPos_15(object, ruleForm.typelabels);
      }
    });
  },
  /**
   * 点击添加监测点
   * @param object 选中部位对象
   * @param typeLabels 部件中监测点的关键字
   * @private
   */
  _setLabelPos_15: function(object, typeLabels) {
    let _this = this;
    this.labelItems = document.getElementsByClassName("elem");
    // 遍历部件
    object.children.forEach(item1 => {
      // 获取监测点的盒子
      if (item1.name.indexOf(typeLabels) !== -1) {
        // 获取监测点
        item1.children.forEach(item => {
          item.traverse(mesh => {
            if (mesh.type === "Mesh") {
              mesh.geometry.computeBoundingBox();
              let box = mesh.geometry.boundingBox;
              mesh.updateMatrixWorld(true);

              let vec3 = new THREE.Vector3();
              vec3.addVectors(box.max, box.min).divideScalar(2.0);
              vec3.applyMatrix4(mesh.matrixWorld);

              for (let i = 0; i < _this.labelItems.length; i++) {
                if (_this.labelItems[i].id === item.name) {
                  _this.labelItems[i].setAttribute("data-pos", vec3.toString());
                }
              }
            }
          });
        });
      }
    });
  },
  /**
   * 设置标签的三维坐标
   * @private
   */
  setLabelPosData: function() {
    // 获取根节点（起作用的Object3D）
    this.labelItems = document.getElementsByClassName("elem");
    let rootNode = this.scene.getObjectByName("RootNode");
    for (let i = 0; i < this.labelItems.length; i++) {
      if (this.labelItems[i].id === "z_Hf_15ji_mesh_001") {
        var vec3 = new THREE.Vector3(-1.5, 0.1, -0.3);
        this.labelItems[i].setAttribute("data-pos", vec3.toString());
      } else {
        let object = rootNode.getObjectByName(this.labelItems[i].id);
        let vector = object.position.clone();
        this.labelItems[i].setAttribute("data-pos", vector.toString());
      }
    }
  },
  /**
   * 设置标签，以及标签的三维坐标
   * @param labelItem 标签div
   * @param pos 三维坐标
   */
  setLabelPos: function(labelItem, pos) {
    labelItem.setAttribute("data-pos", pos.toString());
  },

  /**
   * 设置标签项
   * @private
   */
  _setLabelItems: function() {
    this.labelItems = document.getElementsByClassName("labelItem");
  },
  /**
   * 时时更新标签的位置
   * @private
   */
  _updateLabelItems: function() {
    if (this.labelItems.length > 0) {
      let coordinate = new PGL.Coordinate(this.webGLRenderer.domElement, this.camera);

      for (let i = 0; i < this.labelItems.length; i++) {
        let str = this.labelItems[i].getAttribute("data-pos");

        if(!str){
          var meshName = this.labelItems[i].getAttribute("id");
          if(meshName){
            var coordinateStr = this.get3Coordinates(meshName);
            if(coordinateStr){
              this.labelItems[i].setAttribute("data-pos",coordinateStr);
              str = coordinateStr;
            }
          }
        }

        if (str) {
          if (this.states.config.label.visible) {
            var visible = coordinate.isVisible(this.scene, str);
            if (!visible) {
              this.labelItems[i].style.display = "none";
              continue;
            }
          }

          let mouse = coordinate.getScreenCoordinate2(str);
          this.labelItems[i].style.transform = `translate(-50%, -50%) translate(${mouse.x}px,${mouse.y}px)`;
          this.labelItems[i].style.zIndex = "10";
          this.labelItems[i].style.display = "block";
        }
      }
    }
  },

  /**
   * 添加三维标签
   * @param data
   */
  addLabels: function(data) {
    this.labels_3d = new PGL.Labels(this.scene, this.states.config.sourceURL);
    this.labels_3d.createLabels(data);
  },
  /**
   * 显示隐藏标签
   * @param visible
   */
  showLables: function(visible) {
    if (this.labels_3d) {
      this.labels_3d.show(visible)
    }
  },

  /**
   * 添加三维标签
   * @param data
   */
  addModelLabel: function(data) {
    if (!this.modelLabels) {
      this.modelLabels = new PGL.ModelLabels(this.scene, this.states)
    }
    this.modelLabels.addLabel(data);
  },
  /**
   * 删除三维标签
   * @param id
   */
  deleteModelLabel: function(id) {
    if (this.modelLabels) {
      this.modelLabels.deleteModelLabel(id);
    }
  },

  updateLabelData: function(data) {
    this.states.updateLabelData(data);
  },

  deleteLabel: function(name) {
    this.states.deleteLabel(name);
  },

  /**
   * 获取坐标
   * @param name
   * @returns {string|null}
   */
  get3Coordinates: function(name) {
    var searchObject = new PGL.SearchObject();
    var mesh = searchObject.findMeshByName(this.scene, name);

    if(!mesh){
      return null;
    }

    var coordinate = new PGL.Coordinate();
    var vec3 = coordinate.calculate3Coordinates(mesh);
    return vec3.toString();
  },

  /***************************** 标签相关方法 end ************************************/
  /**
   * 获取渲染面的范围
   * @returns {*}
   */
  getHeight: function() {
    if (this.container) {
      return this.container.clientHeight;
    }
    // return $(this.container).height();
  },
  getWidth: function() {
    if (this.container) {
      return this.container.clientWidth;
    }
    // return $(this.container).width();
  },
  /**
   * 根据num的值来返回颜色值
   * @param num
   * @returns {string}
   */
  color_filter: function(num) {
    if (num >= 0 && num <= 25) {
      return "0xE50E0E";
    } else if (num > 25 && num <= 50) {
      return "0xFF9A4B";
    } else if (num > 50 && num <= 55) {
      return "0xFF9043";
    } else if (num > 55 && num <= 60) {
      return "0xFFE465";
    } else if (num > 60 && num <= 70) {
      return "0xF1E80D";
    } else if (num > 70 && num <= 90) {
      return "0x00A2FF";
    } else if (num > 90 && num <= 100) {
      return "0x04FFC9";
    }
  },

  /*******************材质相关方法 start ************************************/

  /**
   * 按级别批量替换网格材质，不记录到当前材质
   * [{
   *   name:"001"
   *   options:{
   *     level:2, 默认为最低级
   *     color: 0xffffff 默认白色
   *   }
   * }]
   */
  changeMeshesMaterial: function(arr) {
    this.materialController.changeMeshesMaterial(arr);
  },

  /**
   * 按级别批量恢复网格材质
   * @param arr
   */
  restoreObjectsMaterial:function(arr){
    this.materialController.restoreObjectsMaterial(arr);
  },

  /**
   * 修改颜色值
   * @param bool 标记是否已经选中
   * @param heat_color 颜色值
   * @param name 名称
   */
  heat_map: function(bool, heat_color, name) {
    const def_color = "#767676";
    let color = !bool ? heat_color : def_color;
    this.scene.traverse(item => {
      if (item.name.indexOf(name) === 0) {
        if (item.type === "Mesh") {
          if (!bool) {
            item.material.emissive.setHex(color);
          } else {
            item.material.emissive.setHex(0x000);
          }
        }
      }
    });
  },
  /**
   * 改变对象下所有材质的Emissive值
   * @param name 对象名称
   * @deprecated
   * @see this.changeMeshMaterial
   */
  changeEmissiveColor: function(name) {
    if (!name) {
      this.materialController.restorePreObject();
      return;
    }
    let object = this.scene.getObjectByName(name);
    this.materialController.changeEmissiveColor(object);
  },
  /**
   * 改变材质以及网格参数
   * @param object 对象||对象名称
   * @param options 对象名称
   *    color:改变
   *    emissive:改变的颜色
   * @deprecated
   * @see clickMesh()
   */
  changeMeshMaterial: function(object, options) {
    if (!object) {
      this.materialController.restorePreLevelObject();
    }

    this.materialController.changeObjectMaterial1(object, options);
  },

  /**
   * 选中网格效果
   * mesh：网格
   */
  clickMesh: function(mesh) {
    this.materialController.restorePreLevelObject(level1);

    this.materialController.changeObjectMaterial1(mesh, {
      color: "#ff0000",
      level: level1
    });
  },

  /**
   * 修改混合
   * @param obj
   * @param name 名称
   */
  changeBlendingByName: function(obj, name) {
    var blendings = {
      No: THREE.NoBlending,
      Normal: THREE.NormalBlending,
      Additive: THREE.AdditiveBlending,
      Subtractive: THREE.SubtractiveBlending,
      Multiply: THREE.MultiplyBlending
    };

    let mesh = obj.getObjectByName(name);
    mesh.receiveShadow = true;
    mesh.material.transparent = true;
    mesh.material.blending = blendings.Additive;
    mesh.material.needsUpdate = true;
    if (this.GUI.gui) {
      var param = {
        blending: "Additive"
      };
      var blendingGUI = this.GUI.gui.addFolder("混合");
      blendingGUI.add(param, 'blending', Object.keys(blendings)).onChange(function(val) {
        mesh.material.transparent = true;
        mesh.material.blending = blendings[val];
        mesh.material.needsUpdate = true;
      });
    }
  },
  /**
   * 修改混合
   * @param obj
   * @deprecated
   * @see changeBlendingByName
   */
  changeBlending: function(obj) {
    this.changeBlendingByName(obj, "Plane062");
  },

  /**
   * 修改材质贴图
   * @param mesh
   * @param name 材质名称
   */
  changeMaterialMap: function(mesh, name) {
    var url = this.states.config.modelData.modelURL + this.states.config.modelData.project + "/textures/" + name;
    var textureLoader = new THREE.TextureLoader();
    mesh.material.map = textureLoader.load(url);
    mesh.material.needsUpdate = true;
  },
  /**
   * 修改材质贴图
   * @param mesh
   * @param filename
   * @deprecated 移动到修改模型类中
   */
  changeMaterialMapByMesh: function(mesh, filename) {
    if (filename === "default") {
      if (mesh.material.userData.sourceMap !== undefined) {
        mesh.material.map = mesh.material.userData.sourceMap;
        mesh.material.needsUpdate = true;
      }

      return;
    }
    var url = this.states.config.modelData.modelURL + this.states.config.modelData.project + "/textures/cube/" + filename + "/" + mesh.material.name + ".jpg";
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, function(texture) {
      if (mesh.material.userData.sourceMap === undefined) mesh.material.userData.sourceMap = mesh.material.map;

      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    });
  },
  /**
   * 修改组成盒子模型的mesh贴图
   * @param object 包含盒子模型的六个模型
   * @param filename 材质的贴图
   */
  changeCubeMeshMap: function(object, filename) {
    this.sceneMaterials.changeCubeMeshMap(object, filename);
  },

  /**
   * 根据规则查找父类
   * @param mesh
   * @param rule
   */
  getParentObjectByRule: function(mesh, rule) {
    if (!mesh) {
      return null;
    }
    var searchObject = new PGL.SearchObject();
    return searchObject.findParentObject(mesh, rule);
  },
  /**
   * 修改给定模型所在组下面所有mesh的颜色
   * @param mesh 选定的mesh
   * @param options 参数
   *    color:改变
   *    emissive:改变的颜色
   *    rule:组名称所包含的字符串
   */
  changeSiblingMeshEmissiveColor: function(mesh, options) {
    options = options || {};

    this.materialController.restorePreLevelObject(options.level);
    if (!mesh) {
      return;
    }

    var parentObject = this.getParentObjectByRule(mesh, options.rule);
    if (parentObject) {
      this.materialController.changeObjectMaterial1(parentObject, options);
    }
  },
  /**
   * 查找对象，修改对象下的所有材质
   * @param name 对象名称
   * @param options 参数
   *    color:改变
   *    emissive:改变的颜色
   *    rule:组名称所包含的字符串
   *    childrenRule:子组包含的字符串
   *    level 修改材质级别
   */
  findChangeObjectMaterial: function(name, options) {
    options = options || {};

    var object = this.scene.getObjectByName(name + options.rule);
    if (object) {
      var childrenObject = object.getObjectByName(name + options.childrenRule);
      if (options.restore) {
        this.materialController.restoreLevelObject(childrenObject, options.level);
      } else {
        this.materialController.changeObjectMaterial1(childrenObject, options);
      }
    }
  },

  /**
   * 返回#号颜色值
   * @param val
   * @returns {string}
   */
  getHexString: function(val) {
    return new THREE.Color(val).getHexStringExt();
  },
  /**
   * 获取材质贴图名称
   * @param name 材质名称
   */
  getMaterialMapName: function(name) {
    return this.states.getMaterialMapName(name);
  },

  getMaterialProperty: function() {
    return this.sceneMaterials.getMaterialProperty();
  },
  /***************** 材质相关方法 end ************************************/

  /***************** 自定义方法 start ************************************/
  addCustomFunction: function(name, funcName, params) {
    this.customFunction.addFunc(name, funcName, params);
  },
  getALLCustomFunction: function() {
    return this.customFunction.getALLFunc()
  },
  removeCustomFunction: function(meshName, name) {
    this.customFunction.removeFunc(meshName, name)
  },

  /***************** 自定义方法 end ************************************/

  /***************************** 事件 ************************************/
  /**
   * 重置渲染窗口
   */
  onWindowResize: function() {
    this.webGLRenderer.setSize(this.getWidth(), this.getHeight());
    if (this.composer) {
      this.composer.setSize(this.webGLRenderer.domElement.width, this.webGLRenderer.domElement.height);
    }
    if (this.effectFXAA) {
      this.effectFXAA.uniforms['resolution'].value.set(1 / this.webGLRenderer.domElement.width, 1 / this.webGLRenderer.domElement.height);
    }
    this.camera.aspect = this.getWidth() / this.getHeight();
    this.camera.updateProjectionMatrix();
    this.render();
  },
  _bind: function(scope, fn) {
    return function() {
      fn.apply(scope, arguments);
    };
  },

  /***************************** 回调函数 ********************************/
  /**
   * 射线拾取回调函数
   */
  selectFirstObjectCallBack: function(object) {
    console.log(object);
  },

  /***************************** 销毁函数 ********************************/
  destroyed: function() {
    // 断开标签dom节点
    this.labelItems = [];
  }
});
export default Scene3D;
