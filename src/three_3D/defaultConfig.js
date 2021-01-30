// 加载模型的类型
export var GLTF_TYPE = '0001'; // gltf模型
export var MTL_OBJ_TYPE = '0002'; // obj模型
export var FBX_TYPE = '0003'; // obj模型

// 背景颜色效果
export var NONE_TYPE = 'none'; // 无效果
export var COLOR_TYPE = 'color'; // 颜色
export var GRADIENT_TYPE = 'gradient'; // 渐变颜色
export var IMG_TYPE = "img"; // 背景设置为贴图

// 天空盒子
export var SKY_BOX_TYPE = 'skyBox'; // 盒子
export var MILKY_WAY = 'MilkyWay'; // 天空盒子材质
export var SKY_BOX = 'skybox'; // 天空盒子材质
export var SKY_BOX_SUN_25_DEG = 'skyboxsun25deg'; // 天空盒子材质

// 球形天空盒子
export var SKY_BOX_SPHERE_TYPE = 'skySphereBox';
export var SKY = 'sky.png'; // 球形天空盒子材质

// 色调类型
export var None = 'None';
export var Linear = 'Linear';
export var Reinhard = 'Reinhard';
export var Uncharted2 = 'Uncharted2';
export var Cineon = 'Cineon';
export var ACESFilmic = 'ACESFilmic';

// 标签方向
export var DIRECTIONX = "X";
export var REVERSEEDIRECTIONX = "-X";
export var DIRECTIONY = "Y";
export var REVERSEEDIRECTIONY = "-Y";
export var DIRECTIONZ = "Z";
export var REVERSEEDIRECTIONZ = "-Z";

// label类型
export var LABELTYPE1 = 1;
export var LABELTYPE2 = 2; // 颜色图片
export var LABELTYPE3 = 3; // 白底图片

// 标签动态变化类型
export var DYNAMICTYPE1 = 4;
export var DYNAMICTYPE2 = 5;

// 修改材质颜色级别,level0为最高级别
export var level0 = 0;
export var level1 = 1;
export var level2 = 2;

export var FONT = 0;
export var BACK = 1;
export var DOUBLE = 2;

// 修改贴图类型
export var CUBEMAPTYPE = "cubeMap";

export default {
  // 资源路径
  sourceURL: "/source/",
  // 模型相关配置
  modelData: {
    modelURL: "/source/", // 模型项目路径
    project: "",// 项目名称，放置模型的位置
    name: "", // 模型名称
    materialName: "", // 材质名称
    url: "", // 模型路径，如果不设置路径，模型的路径根据 sourceURL + project + "/model/"自动查找
    loadType: GLTF_TYPE, // 加载模型的类型 GLTF_TYPE（默认）
  },
  // 相机相关配置
  camera: {
    far: 10000, // 最远点
    // 相机位置
    position: {
      x: -2.759704412746413,
      y: 2.9209573658172236,
      z: 6.850627394782629
    },
    minDistance: 0, // 最近距离
    maxDistance: Infinity, // 最远距离
    target: {x: 0, y: 0, z: 0}, // 视点
    enableZoom: true, // 禁用缩放
    enablePan: false, // 移动
    enableRotate: false,// 旋转
    enableRotatePhi: false, // 启动上下旋转
    enableLimitPan: false // 限制物体中心在可视范围内
  },
  // 场景配置
  scene: {
    background: {
      type: NONE_TYPE, // 背景类型
      color: "#ffffff",
      startColor: "#233a43",
      endColor: "#000000",
      skyBoxType: SKY_BOX,
      imgName: SKY, // 背景图片名称
      filename: SKY,
    },
  },
  // 渲染器配置
  webGLRenderer: {
    alpha: 1.0, // 画布是否透明
    zIndex: "0",   // 画布显示的级别
    toneMapping: Linear, // 色调类型
    toneMappingExposure: 1.0, // 色调强度,
    globalClipping: false, // 全局裁剪
    enableShadow: false,// 开启阴影
  },
  // 灯光的相关配置
  lightSetting: {
    // 环境光设置
    ambientLight: {
      color: 0xffffff,
      intensity: 1.0,
    },
    // 平行光相关配置
    directionalLight: {
      color: 0xffffff,
      intensity: 1.0,
      position: {
        x: 5,
        y: 5,
        z: 20
      },
      target: {
        x: 0,
        y: 0,
        z: 0
      },
      castShadow: false
    },
    // 聚光灯
    spotLight: {
      color: 0xffffff,
      intensity: 0,
      distance: 50,
      angle: 0.3,
      penumbra: 0.3,
      decay: 1.2,
      position: {
        x: 20,
        y: 30,
        z: 20
      },
      target: {
        x: 0,
        y: 0,
        z: 0
      },
      castShadow: false
    },
    // 点光源相关配置
    pointLight: {
      color: 0xffffff,
      intensity: 0,
      distance: 124,
      decay: 1.0,
      position: {
        x: -25.8,
        y: 55.3,
        z: 2.4
      },
      castShadow: false
    },
  },
  // 功能项
  functionItem: {
    enableGUI: false
  },
  // 标签属性
  label: {
    // 检测可见性
    visible: false
  }
};