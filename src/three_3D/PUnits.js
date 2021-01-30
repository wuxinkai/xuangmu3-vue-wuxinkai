import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import dat from "three/examples/jsm/libs/dat.gui.module.js";
debugger
import {
  COLOR_TYPE, DIRECTIONZ, DYNAMICTYPE1, DYNAMICTYPE2,
  GLTF_TYPE, FBX_TYPE, MTL_OBJ_TYPE,
  GRADIENT_TYPE, IMG_TYPE, LABELTYPE1, LABELTYPE2, LABELTYPE3, MILKY_WAY,
  NONE_TYPE, REVERSEEDIRECTIONX, DIRECTIONY,
  SKY_BOX, SKY_BOX_SPHERE_TYPE,
  SKY_BOX_SUN_25_DEG,
  SKY_BOX_TYPE, level0,
  CUBEMAPTYPE, FONT, BACK, DOUBLE
} from "./defaultConfig";

import defaultConfig from "./defaultConfig";
import defaultModelConfig from "./defaultModelConfig";

/**
 * 转化成字符串输出
 * @returns {string}
 */
THREE.Vector3.prototype.toString = function() {
  return this.x + "," + this.y + "," + this.z;
};
THREE.Vector3.prototype.fromString = function(str) {
  let arr = str.split(',');
  this.x = parseFloat(arr[0]);
  this.y = parseFloat(arr[1]);
  this.z = parseFloat(arr[2]);
  return this;
};
THREE.Vector3.prototype.fromData = function(data) {
  if (data.constructor === this.constructor) {
    this.copy(data);
  } else if (data.constructor === String) {
    this.fromString(data);
  }

  return this;
};

// 扩展颜色方法
THREE.Color.prototype.getHexStringExt = function() {
  return "#" + this.getHexString();
};

/**
 * 合并两个json对象
 * @param object1 基础对象
 * @param object2 合并对象
 * @returns {Array} 合并后的对象
 */
Object.deepMerge = function(object1, object2) {
  function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          //判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = deepClone(obj[key]);
          } else {
            //如果不是，简单复制
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  }

  let object = deepClone(object1);

  function deepMerge(object, object2) {
    if (object2 && typeof object2 === "object") {
      for (let key in object2) {
        if (object2.hasOwnProperty(key)) {
          if (Array.isArray(object2[key]) || !object.hasOwnProperty(key)) {
            object[key] = deepClone(object2[key]);
          } else if (typeof object2[key] === "object") {
            deepMerge(object[key], object2[key]);
          } else {
            object[key] = object2[key];
          }
        }
      }
    }
  }

  deepMerge(object, object2);

  return object;
};

/**
 * JSON扩展
 * @param json
 */
JSON.stringifyExt = function(json) {
  return JSON.stringify(json, function(key, value) {
    if (value === Infinity) {
      return "Infinity";
    }
    return value;
  })
};
JSON.parseExt = function(str) {
  return JSON.parse(str, function(key, value) {
    if (value === "Infinity") {
      return Infinity;
    }
    return value;
  });
};

let PGL = {};

PGL.stringifyExt = JSON.stringifyExt;
PGL.parseExt = JSON.parseExt;

PGL.Units = {
  isEffectiveValue: function(value) {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false
  }
};

/**
 * 查找模型方法
 * @constructor
 */
PGL.SearchObject = function() {
};
Object.assign(PGL.SearchObject.prototype, {
  findMeshName: function(object, callback) {
    if (object === undefined) {
      return;
    }

    f(object, callback);

    function f(object, callback) {
      if (object.constructor === THREE.Mesh) {
        callback(object);
      } else {
        for (let i = 0; i < object.children.length; i++) {
          f(object.children[i], callback);
        }
      }
    }
  },

  /**
   * 查找根据条件剔除
   * @param object
   * @param name
   * @param callback
   */
  findMeshByCondition: function(object, name, callback) {
    f(object, name, callback);

    function f(object, name, callback) {
      if (object.name === name) {
        return;
      }

      if (object.constructor === THREE.Mesh) {
        callback(object);
      } else {
        for (let i = 0; i < object.children.length; i++) {
          f(object.children[i], name, callback);
        }
      }
    }
  },

  /**
   * 根据名称查找mesh
   * @param object
   * @param name
   * @returns {*}
   */
  findMeshByName: function(object, name) {
    var mesh = null;

    f(object, name);

    function f(object, name) {
      if (object.constructor === THREE.Mesh && object.name === name) {
        mesh = object;
      } else {
        for (let i = 0; i < object.children.length; i++) {
          f(object.children[i], name);
        }
      }
    }

    return mesh;
  },

  /**
   * 查找所有的mesh
   * @param object
   * @param callback
   */
  findAllMesh: function(object, callback) {
    if (object.isMesh) {
      callback(object);
    } else {
      for (var i = 0; i < object.children.length; i++) {
        this.findAllMesh(object.children[i], callback);
      }
    }
  },

  /**
   * 查找object中的所有mesh
   * @param object
   * @param meshes{Array}
   */
  getAllMesh: function(object, meshes) {
    if (object.isMesh) {
      meshes.push(object);
    } else {
      for (var i = 0; i < object.children.length; i++) {
        this.getAllMesh(object.children[i], meshes);
      }
    }
  },

  /**
   * 根据规则查找对象的父类
   * @param object 当前对象
   * @param rule 父类节点规则
   */
  findParentObject: function(object, rule) {
    if (object.name.indexOf(rule) !== -1) {
      return object;
    } else if (object.parent) {
      return this.findParentObject(object.parent, rule);
    }

    return null;
  },

  /**
   * 查找所有材质
   * @param object
   * @param materials
   */
  findALLMaterial: function(object, materials) {
    if (object.isMesh) {
      if (object.material.name !== "" && object.material.name !== undefined) {
        materials[object.material.name] = object.material;
      }
    } else {
      for (var i = 0; i < object.children.length; i++) {
        this.findALLMaterial(object.children[i], materials);
      }
    }

    return materials;
  },

  /**
   * 查找所有材质，调用返回函数
   * @param object
   * @param callback
   */
  searchALLMaterial: function(object, callback) {
    if (object === undefined) {
      return;
    }

    f(object, callback);

    function f(object, callback) {
      if (object.constructor === THREE.Mesh) {
        callback(object.material);
      } else {
        for (let i = 0; i < object.children.length; i++) {
          f(object.children[i], callback);
        }
      }
    }
  },

  /**
   * 根据名称查找材质
   * @param object
   * @param name
   */
  findMaterialByName: function(object, name) {
    if (object.isMesh) {
      if (object.material.name === name) {
        return object.material;
      }
    } else {
      for (var i = 0; i < object.children.length; i++) {
        var material = this.findMaterialByName(object.children[i], name);
        if (material && material.name === name) {
          return material;
        }
      }
    }

    return null;
  }
});

/**
 * Object3D扩展方法
 * @constructor
 */
PGL.Object3DExtension = function() {

};
Object.assign(PGL.Object3DExtension.prototype, {
  /**
   * 释放object对象及子对象
   * @param object
   */
  dispose: function(object) {
    if (object.constructor === THREE.Mesh) {
      object.geometry.dispose();
      PGL.MaterialController.prototype.disposeMaterial(object.material);
    } else {
      for (var i = 0; i < object.children.length; i++) {
        this.dispose(object.children[i]);
      }
    }
  }
});

/*************************** 材质管理start **********************************/
/**
 * 材质渐变
 * @param object 渐变对像
 * @param options
 * @constructor
 */
PGL.MaterialGradient = function(object, options) {
  this.object = object;

  this.options = options || {};

  this.luminance = this.options.luminance !== undefined ? this.options.luminance : 1.0;
  this.speed = this.options.speed !== undefined ? this.options.speed : 5;

  this.r = this.options.r !== undefined ? this.options.r : 0.5;
  this.g = this.options.g !== undefined ? this.options.g : 1.0;
  this.factorB = this.options.factorB !== undefined ? this.options.factorB : 0.5;
  this.growthRate = this.options.growthRate !== undefined ? this.options.growthRate : 0.5;

  this.searchObject = new PGL.SearchObject();
};
Object.assign(PGL.MaterialGradient.prototype, {
  /**
   * 实时更新对象的材质颜色
   * @param timer
   */
  updateObject: function(timer) {
    if (this.object.constructor === THREE.Mesh) {
      this._changeMeshMaterial(this.object, timer);
    } else {
      let _this = this;
      this.searchObject.findMeshName(this.object, function(mesh) {
        _this._changeMeshMaterial(mesh, timer);
      })
    }
  },
  /**
   * 修改mesh下的材质颜色
   * @param mesh
   * @param timer
   * @private
   */
  _changeMeshMaterial: function(mesh, timer) {
    if (mesh.material.constructor === Array) {
      for (let j = 0; j < mesh.material.length; j++) {
        this._changeMaterial(mesh.material[j], timer);
      }
    } else {
      this._changeMaterial(mesh.material, timer);
    }
  },
  /**
   * 修改材质颜色
   * @param material
   * @param timer
   * @private
   */
  _changeMaterial: function(material, timer) {
    material.color.set(this.r, this.g, this.luminance * (this.factorB + this.growthRate * Math.cos(this.speed * timer)));
    material.emissive.setHSL(this.r, this.g, this.luminance * (this.factorB + this.growthRate * Math.sin(this.speed * timer)))
  }
});

/**
 * 管理材质渐变
 * @constructor
 */
PGL.MaterialGradients = function() {
  this.objectList = {};
};
Object.assign(PGL.MaterialGradients.prototype, {
  /**
   * 添加对象到管理呼吸灯类
   * @param object 对象
   * @param options 参数
   */
  addObject: function(object, options) {
    if (!this.objectList[object.uuid]) {
      this.objectList[object.uuid] = new PGL.MaterialGradient(object, options);
    }
  },
  updateObject: function(timer) {
    for (let uuid in this.objectList) {
      this.objectList[uuid].updateObject(timer);
    }
  }
});

/**
 * 控制修改材质
 * @constructor
 */
PGL.MaterialController = function(scene) {

  this.scene = scene;

  // 默认级别
  this.defaultLevel = level0;

  // 保存改变颜色的对象
  this.preObject = null;

  // 每个级别保存上次修改的对象
  this.preObjects = {};
};
Object.assign(PGL.MaterialController.prototype, {
  /**
   * 修改对象中包含的所有材质属性
   * @param object
   * @param options
   */
  changeObjectMaterial: function(object, options) {
    var _this = this;

    let searchObject = new PGL.SearchObject();
    searchObject.findMeshName(object, function(mesh) {
      _this._changeMaterial(mesh.material, options);
    });
  },

  /**
   * 按级别替换对象下的所有材质属性
   * @param object
   * @param options
   *    level：级别
   */
  changeObjectMaterial1: function(object, options) {
    if (!object) {
      return;
    }
    if (typeof object == "string") {
      object = this.scene.getObjectByName(object);
    }

    options = options || {};
    if (!options.level) {
      options.level = this.defaultLevel;
    }
    this.preObjects[options.level] = object;

    var _this = this;
    let searchObject = new PGL.SearchObject();
    searchObject.findMeshName(object, function(mesh) {
      _this._changeMaterialByLevel(mesh, options);
    });
  },

  /**
   * 按级别替换网格材质
   * @param mesh 网格
   * @param options 网格参数
   */
  changeMeshMaterial1: function(mesh, options) {
    if (!mesh) {
      return;
    }
    if (typeof mesh == "string") {
      mesh = this.scene.getObjectByName(mesh);
    }

    options = options || {};
    if (!options.level) {
      options.level = this.defaultLevel;
    }

    this._changeMaterialByLevel(mesh, options);
  },

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
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      this.changeMeshMaterial1(item.name, item.options);
    }
  },

  /**
   * 修改材质属性
   * @param material
   * @param options
   * @private
   */
  _changeMaterial: function(material, options) {
    if (options.emissive) {
      material.emissive.set(options.emissive);
    }
    if (options.color) {
      material.color.set(options.color);
    }
    if (options.transparent) {
      material.transparent = options.transparent;
    }
    if (options.opacity) {
      material.opacity = options.opacity;
    }
    material.needsUpdate = true;
  },

  /**
   * 按级别替换材质
   * @param mesh
   * @param options
   * @private
   */
  _changeMaterialByLevel: function(mesh, options) {

    if (!mesh.userData.sourceMaterial) {
      mesh.userData.sourceMaterial = mesh.material;
    }

    var material;
    if (Array.isArray(mesh.material)) {
      material = [];
      for (var i = 0; i < mesh.material.length; i++) {
        material.push(mesh.material[i].clone());
        this._changeMaterial(material[i], options);
      }
    } else {
      material = mesh.material.clone();
      this._changeMaterial(material, options);
    }


    if (PGL.Units.isEffectiveValue(mesh.userData.level) || mesh.userData.level >= options.level) {
      mesh.material = material;
      mesh.userData.level = options.level;
    }

    if (mesh.userData.levelData && mesh.userData.levelData[options.level] && mesh.userData.levelData[options.level].material) {
      this.disposeMaterial(mesh.userData.levelData[options.level].material);
    } else {
      mesh.userData.levelData = mesh.userData.levelData || {};
      mesh.userData.levelData[options.level] = mesh.userData.levelData[options.level] || {};
    }
    mesh.userData.levelData[options.level].material = material;
  },

  /**
   * 获取除给定的显示级别外的最大显示级别
   * @param levelData
   * @param level 当前级别
   * @private
   */
  _getSecondMaxLevel: function(levelData, level) {
    var maxLevel = null;
    for (var levelKey in levelData) {
      if (levelData[levelKey].material !== undefined) {
        levelKey = parseInt(levelKey);
        if (levelKey !== level) {
          if (maxLevel === null) {
            maxLevel = levelKey;
          } else {
            if (levelKey < maxLevel) {
              maxLevel = levelKey;
            }
          }
        }
      }
    }

    return maxLevel;
  },

  /**
   * 按级别恢复上一个替换的材质
   */
  restorePreLevelObject: function(level) {
    var currentLevel = level !== undefined ? level : this.defaultLevel;
    if (!this.preObjects[currentLevel]) {
      return;
    }

    this.restoreLevelObject(this.preObjects[currentLevel], currentLevel);
  },
  /**
   * 按级别恢复替换的材质
   */
  restoreLevelObject: function(object, level) {

    if (!object || level === undefined) {
      return;
    }

    if (typeof object == "string") {
      object = this.scene.getObjectByName(object);
    }

    if (object.constructor === THREE.Mesh) {
      this._restoreMeshMaterial(object, level);
    } else {
      let _this = this;

      let searchObject = new PGL.SearchObject();
      searchObject.findMeshName(object, function(mesh) {
        _this._restoreMeshMaterial(mesh, level);
      });
    }
  },

  /**
   * 按级别批量恢复网格材质
   * @param arr
   */
  restoreObjectsMaterial: function(arr) {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      this.restoreLevelObject(item.name, item.options.level);
    }
  },

  /**
   * 按级别恢复网格材质
   */
  _restoreMeshMaterial: function(mesh, level) {

    if (mesh === undefined || level === undefined) {
      return;
    }

    var levelData = mesh.userData.levelData;
    var maxLevel = this._getSecondMaxLevel(levelData, level);

    delete levelData[level].material;
    let material = mesh.material;
    if (maxLevel === null) {
      mesh.material = mesh.userData.sourceMaterial;
    } else {
      mesh.material = mesh.userData.levelData[maxLevel].material;
    }

    mesh.userData.level = maxLevel;

    this.disposeMaterial(material);
  },

  /**
   * 删除材质
   */
  disposeMaterial: (function() {
    return function(material) {
      if (material) {
        if (Array.isArray(material)) {
          for (var i = 0; i < material.length; i++) {
            material[i].dispose();
          }
        } else if (material.constructor === THREE.Material) {
          material.dispose();
        }
      }
    }
  })(),
  /********************** 过期方法 *****************************/

  /**
   * 修改Emissive颜色
   * @param object
   * @deprecated
   */
  changeEmissiveColor: function(object) {
    this.restorePreObject();

    this.preObject = object;

    let searchObject = new PGL.SearchObject();
    searchObject.findMeshName(object, function(mesh) {
      mesh.userData.sourceMaterial = mesh.material;
      mesh.material = mesh.material.clone();
      mesh.material.emissive.setHex(0x00DEFF);
    });
  },
  /**
   * 修改Emissive颜色
   * @param object
   * @param options
   *    emissive:发光颜色
   *    color: 底色
   *    scale：模型缩放
   * @deprecated
   */
  changeMeshMaterial: function(object, options) {
    this.restorePreObject();

    this.preObject = object;

    let searchObject = new PGL.SearchObject();
    searchObject.findMeshName(object, function(mesh) {
      mesh.userData.sourceMaterial = mesh.material;
      mesh.material = mesh.material.clone();
      if (options.emissive) {
        mesh.material.emissive.setHex(options.emissive);
      }
      if (options.color) {
        mesh.material.color.setHex(options.color);
      }
      if (options.scale) {
        mesh.scale.set(options.scale.x, options.scale.y, options.scale.z);
      }
    });
  },
  /**
   * 恢复上一个改变的颜色
   * @deprecated
   */
  restorePreObject: function() {
    if (!this.preObject) {
      return;
    }

    let _this = this;
    let searchObject = new PGL.SearchObject();
    searchObject.findMeshName(this.preObject, function(mesh) {
      let material = mesh.material;
      mesh.material = mesh.userData.sourceMaterial;
      _this.disposeMaterial(material);
      mesh.scale.set(1, 1, 1);
    });

    this.preObject = null;
  },
});

/**
 * 管理场景中的材质
 * @constructor
 */
PGL.SceneMaterials = function(scene, states) {
  this.scene = scene;
  this.states = states;

  this.controllers = [];

  // 记录场景中的材质 key:name,value:material
  this.materials = {};
  // 当前材质
  this.material = null;
  this.materialName = null;
};
Object.assign(PGL.SceneMaterials.prototype, {
  /**
   * 查找并保存场景中所有的材质
   */
  update: function(object, gui) {
    // 初始化材质
    this.materials = {};

    var searchObject = new PGL.SearchObject();
    searchObject.findALLMaterial(object, this.materials);
    this._updateMaterialsModelConfig();

    // 设置当前材质
    for (var materialName in this.materials) {
      this.materialName = materialName;
      this.material = this.materials[materialName];
      break;
    }

    // 四面切换贴图
    if (this.states.modelConfig.map.type === CUBEMAPTYPE) {
      this._updateMaterial(object, gui, this.states.modelConfig);
    }

    // 添加PBR控制
    if (gui) {
      this.addPBRMaterial(object, gui);
    }
  },

  _updateMaterialsModelConfig: function() {
    for (var name in this.states.modelConfig.material) {
      var values = this.states.modelConfig.material[name];
      for (var item in values) {
        this.updateMaterialProperty(this.materials[name], item, values[item]);
      }
    }
  },

  updateMaterial: function(type, val) {
    this.states.modelConfig.material[this.material.name] = this.states.modelConfig.material[this.material.name] || {};

    switch(type){
      case "name":
        this.setMaterial(val);
        break;
      case "color":
      case "emissive":
        this.updateMaterialProperty(this.material, type, val);
        this.states.modelConfig.material[this.material.name][type] = this.material[type].getHex();
        break;
      case "map":
        this.updateMaterialProperty(this.material, type, val);
        this.states.modelConfig.material[this.material.name].mapName = filename;
        break;
      case "rotation":
        this.updateMaterialProperty(this.material, type, val);
        this.states.modelConfig.material[this.material.name][type] = val;
        break;
      case "emissiveIntensity":
      case "opacity":
      case "transparent":
      case "roughness":
      case "metalness":
      case "visible":
      case "wireframe":
      case "side":
        this.updateMaterialProperty(this.material, type, val);
        this.states.modelConfig.material[this.material.name][type] = val;
        break;
      default:
        console.log("未处理属性：" + type);
        break;
    }
  },

  updateMaterialProperty: function(material, item, value) {
    switch(item){
      case "opacity":
      case "transparent":
      case "visible":
      case "roughness":
      case "metalness":
      case "side":
      case "emissiveIntensity":
      case "wireframe":
        if (material[item] !== value) {
          material[item] = value;
        }
        break;
      case "color":
      case "emissive":
        if (material[item].getHex() !== value) {
          material[item].set(value);
        }
        break;
      case "map":
        this._changeMaterialMap(item, value);
        break;
      case "rotation":
        if (material.map) {
          material.map.rotation = value / 180 * Math.PI;
        }
        break;
      default:
        console.log("未处理属性：" + item);
    }
    material.needsUpdate = true;
  },

  /**
   * 修改材质贴图
   * @param filename
   * @deprecated
   * @see _changeMaterialMap
   */
  changeMaterialMap: function(filename) {
    var material = this.material;
    var scope = this;
    if (!material) {
      return;
    }

    if (filename === "default") {
      if (material.userData.sourceMap !== undefined) {
        material.map = material.userData.sourceMap;
        material.needsUpdate = true;
      }

      if (scope.states.modelConfig.material[material.name]) {
        delete scope.states.modelConfig.material[material.name].mapName;
      }
      return;
    }

    var url = this.states.config.modelData.modelURL + this.states.config.modelData.project + "/textures/" + filename;
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, function(texture) {
      if (material.userData.sourceMap === undefined) material.userData.sourceMap = material.map;

      material.map = texture;
      material.map.wrapS = THREE.RepeatWrapping;
      material.map.wrapT = THREE.RepeatWrapping;

      if (scope.states.modelConfig.material[material.name]) {
        if (scope.states.modelConfig.material[material.name].rotation) {
          material.map.rotation = scope.states.modelConfig.material[material.name].rotation / 180 * Math.PI;
        }
        scope.states.modelConfig.material[material.name].mapName = filename;
      }

      material.needsUpdate = true;
    });
  },
  /**
   * @param type 属性名称
   * @param filename 文件名称
   * @private
   */
  _changeMaterialMap: function(type, filename) {
    var material = this.material;
    var scope = this;
    if (!material) {
      return;
    }

    if (filename === "default") {
      if (material.userData.source !== undefined && material.userData.source[type] !== undefined) {
        material[type] = material.userData.source[type];
        material.needsUpdate = true;
      }

      if (scope.states.modelConfig.material[material.name]) {
        delete scope.states.modelConfig.material[material.name].mapName;
      }
      return;
    }

    var url = this.states.config.modelData.modelURL + this.states.config.modelData.project + "/textures/" + filename;
    var textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, function(texture) {
      if (material.userData.source === undefined) {
        material.userData.source = {};
        if (material.userData.source[type] === undefined) {
          material.userData.source[type] = material[type];
        }
      }

      material[type] = texture;
      material[type].wrapS = THREE.RepeatWrapping;
      material[type].wrapT = THREE.RepeatWrapping;

      if (scope.states.modelConfig.material[material.name]) {
        if (scope.states.modelConfig.material[material.name].rotation) {
          material[type].rotation = scope.states.modelConfig.material[material.name].rotation / 180 * Math.PI;
        }
      }

      material.needsUpdate = true;
    });
  },

  /**
   * 获取当前材质
   */
  getMaterial: function() {
    return this.material;
  },

  /**
   * 获取所有材质的名称
   * @returns {Array}
   */
  getMaterialNames: function() {
    var names = [];
    for (var name in this.materials) {
      names.push(name);
    }
    return names;
  },

  /**
   * 获取材质属性
   */
  getMaterialProperty: function() {
    var materialProperty = {};
    materialProperty.names = this.getMaterialNames();
    materialProperty.name = this.materialName;

    materialProperty.mapNames = this.states.getTexturesNames();
    materialProperty.mapName = this.states.getMaterialMapName(materialProperty.name);
    if (materialProperty.map) {
      materialProperty.rotation = this.material.map.rotation;
    }

    materialProperty.color = this.material.color.getHexStringExt();
    materialProperty.emissive = this.material.emissive.getHexStringExt();
    materialProperty.emissiveIntensity = this.material.emissiveIntensity;
    materialProperty.side = this.material.side;
    materialProperty.opacity = this.material.opacity;
    materialProperty.transparent = this.material.transparent;
    materialProperty.roughness = this.material.roughness;
    materialProperty.metalness = this.material.metalness;
    materialProperty.visible = this.material.visible;
    materialProperty.wireframe = this.material.wireframe;

    return materialProperty;
  },

  /**
   * 设置当前材质
   * @param name
   */
  setMaterial: function(name) {
    if (name) {
      this.material = this.materials[name];
      this.materialName = name;
    } else {
      this.material = null;
      this.materialName = null;
    }
  },

  /**
   * 控制材质修改
   * @param object
   * @param gui
   */
  addPBRMaterial: function(object, gui) {
    var _this = this;

    if (gui && this.material) {
      // 获取所有材质名称
      var materialNames = [];
      for (var name in this.materials) {
        materialNames.push(name);
      }

      var param = {
        materialName: this.material.name,
        textures: "default",
      };
      var pbrMaterial = gui.addFolder("pbr材质");
      pbrMaterial.add(param, 'materialName', materialNames).name("材质名称").onFinishChange(function(val) {
        _this._changeMaterialGUI(this.__gui, val, object);
      });

      // 添加选中材质切换贴图
      pbrMaterial.add(param, 'textures', this.states.modelConfig.textures).name("贴图").onFinishChange(function(val) {
        _this.states.modelConfig.material[_this.materialName] = _this.states.modelConfig.material[_this.materialName] || {};
        _this.states.modelConfig.material[_this.materialName].mapName = val;

        _this._changeMaterialMap("map", val);
      });

      this.addPARMaterialControl(pbrMaterial, object);
    }
  },
  /**
   * 修改当前材质
   * @param gui
   * @param name 材质名称
   * @param object 查找范围
   */
  _changeMaterialGUI(gui, name, object) {
    this._removeBeforeController(gui);

    this.materialName = name;

    this.addPARMaterialControl(gui, object);
  },
  /**
   * 移除前面材质的修改材质
   * @param gui
   * @private
   */
  _removeBeforeController(gui) {
    var controllers = this.controllers || [];
    for (var i = 0; i < controllers.length; i++) {
      gui.remove(controllers[i]);
    }
    this.controllers = [];
  },
  /**
   * 修改材质信息
   * @param object
   * @param gui
   * @param modelConfig
   * @private
   */
  _updateMaterial: function(object, gui, modelConfig) {
    // 修改贴图信息
    this._updateCubeMap(object, gui, modelConfig.map);

    var searchObject = new PGL.SearchObject();
    var materials = searchObject.findALLMaterial(object, {});
    for (var name in materials) {
      if (modelConfig.material[name]) {
        if (modelConfig.material[name].color) {
          materials[name].color.setHex(modelConfig.material[name].color);
        }
        if (modelConfig.material[name].wireframe) {
          materials[name].wireframe = modelConfig.material[name].wireframe;
        }
        if (modelConfig.material[name].emissive) {
          materials[name].emissive.setHex(modelConfig.material[name].emissive);
        }
        if (modelConfig.material[name].opacity) {
          materials[name].opacity = modelConfig.material[name].opacity;
          if (materials[name].opacity < 1.0) {
            materials[name].transparent = true;
          } else {
            materials[name].transparent = false;
          }
        }
        if (modelConfig.material[name].side) {
          materials[name].side = modelConfig.material[name].side;
        }
        if (modelConfig.material[name].roughness) {
          materials[name].roughness = modelConfig.material[name].roughness;
        }
        if (modelConfig.material[name].metalness) {
          materials[name].metalness = modelConfig.material[name].metalness;
        }
        if (modelConfig.material[name].visible !== undefined) {
          materials[name].visible = modelConfig.material[name].visible;
        }
        if (modelConfig.material[name].mapName) {
          this.changeMaterialMap(object, name, modelConfig.material[name].mapName);
        }
        if (modelConfig.material[name].rotation) {
          materials[name].userData.map = materials[name].userData.map || {};
          materials[name].userData.map.rotation = modelConfig.material[name].rotation / 180 * Math.PI;
        }
      }
    }
  },
  /**
   * 添加材质控制
   * @param gui
   * @param object 查找范围
   */
  addPARMaterialControl(gui, object) {
    var _this = this;
    var searchObject = new PGL.SearchObject();
    var material = searchObject.findMaterialByName(object, this.materialName);
    var rotation = 0;
    if (material.map) {
      rotation = material.map.rotation / Math.PI * 180;
    }
    var param = {
      color: material.color.getHex(),
      opacity: material.opacity,
      emissive: material.emissive.getHex(),
      roughness: material.roughness || 0,
      metalness: material.metalness || 0,
      mapRotation: rotation,
      visible: material.visible,
      wireframe: material.wireframe,
      side: material.side
    };

    var colorControl = gui.addColor(param, 'color').name("材质颜色").onFinishChange(function(val) {
      material.color.setHex(val);
      material.needsUpdate = true;

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].color = val;
    });
    this.controllers.push(colorControl);
    var emissiveControl = gui.addColor(param, 'emissive').name("发光颜色").onFinishChange(function(val) {
      material.emissive.setHex(val);
      material.needsUpdate = true;

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].emissive = val;
    });
    this.controllers.push(emissiveControl);

    var sides = {
      'FRONT': FONT,
      'BACK': BACK,
      'DOUBLE': DOUBLE
    };
    var sideControl = gui.add(param, 'side', sides).name("side").onFinishChange(function(val) {

      if (sides[param.side] !== material.side) {
        material.side = val;
        material.needsUpdate = true;
      }

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].side = material.side;
    });

    this.controllers.push(sideControl);

    var opacityControl = gui.add(param, "opacity", 0.0, 1.0).name("透明度").onChange(function(val) {
      if (val < 1.0) {
        material.transparent = true;
      } else {
        material.transparent = false;
      }

      material.opacity = val;
      material.needsUpdate = true;

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].opacity = val;
    });
    this.controllers.push(opacityControl);

    var roughnessControl = gui.add(param, "roughness", 0.0, 1.0).name("平滑度").onChange(function(val) {


      material.roughness = val;
      material.needsUpdate = true;

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].roughness = val;
    });
    this.controllers.push(roughnessControl);

    var metalnessControl = gui.add(param, "metalness", 0.0, 1.0, 0.1).name("金属性").onChange(function(val) {

      material.roughness = val;
      material.needsUpdate = true;

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].metalness = val;
    });
    this.controllers.push(metalnessControl);

    var visibleControl = gui.add(param, "visible").name("可见性").onChange(function(val) {

      material.visible = val;
      material.needsUpdate = true;

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].visible = val;
    });
    this.controllers.push(visibleControl);

    var wireframeControl = gui.add(param, "wireframe").name("线框").onChange(function(val) {

      material.wireframe = val;
      material.needsUpdate = true;

      _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
      _this.states.modelConfig.material[material.name].wireframe = val;
    });
    this.controllers.push(wireframeControl);

    var mapRotationControl = gui.add(param, "mapRotation", 0, 360).name("旋转贴图").onChange(function(val) {

      if (material.map) {
        material.map.rotation = val / 180 * Math.PI;
        material.needsUpdate = true;

        _this.states.modelConfig.material[material.name] = _this.states.modelConfig.material[material.name] || {};
        _this.states.modelConfig.material[material.name].rotation = val;
      }

    });
    this.controllers.push(mapRotationControl);
  },

  /**
   * 修改贴图
   * @param object
   * @param gui
   * @param options
   * @private
   */
  _updateCubeMap: function(object, gui, options) {
    // map: {
    //   type: CUBEMAPTYPE,
    //     groupName: "yanhe_001", // 模型组名称
    //     filename: "default", // 当前贴图文件名称
    //     filenames: ["default", "huangshan001", "huangshan002"], // 可以更换的贴图集合
    // }
    var group = object.getObjectByName(options.groupName);
    this.changeCubeMeshMap(group, options.filename);

    if (gui) {
      var _this = this;
      var filenames = options.filenames;
      var param = {
        filename: options.filename,
      };
      var cubMapGUI = gui.addFolder("贴图集合");
      cubMapGUI.add(param, 'filename', filenames).name("贴图文件名称").onFinishChange(function(val) {
        _this.changeCubeMeshMap(group, val);
      });
    }
  },
  /**
   * 修改材质贴图
   * @param mesh
   * @param filename
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
      mesh.material.map.wrapS = THREE.RepeatWrapping;
      mesh.material.map.wrapT = THREE.RepeatWrapping;

      if (mesh.material.userData.map && mesh.material.userData.map.rotation) {
        mesh.material.map.rotation = mesh.material.userData.map.rotation;
      }
      mesh.material.needsUpdate = true;
    });
  },
  /**
   * 修改组成盒子模型的mesh贴图
   * @param object 包含盒子模型的六个模型
   * @param filename 材质的贴图
   */
  changeCubeMeshMap: function(object, filename) {
    var _this = this;
    object.traverse(function(obj) {
      if (obj.constructor === THREE.Mesh) {
        _this.changeMaterialMapByMesh(obj, filename);
      }
    });

    this.states.modelConfig.map.filename = filename;
  },
});
/*************************** 材质管理end **********************************/

/**
 * loader加载
 * @param states 状态机
 * @constructor
 */
PGL.Loaders = function(states) {
  this.states = states;
};
Object.assign(PGL.Loaders.prototype, {
  /**
   * 加载模型
   * @param options 参数
   *  url:模型路径
   *  project：模型文件夹
   *  loadType: 模型类型
   *  name:模型名称
   *  materialName：材质名称
   * @param callback 回调函数
   */
  load: function(options, callback) {

    var url = this._resolveURL(options);

    if (options.loadType === GLTF_TYPE) {
      if (!this.GLTFLoader) {
        this.GLTFLoader = new GLTFLoader();
      }
      this.GLTFLoader.setPath(url);
      this.GLTFLoader.load(options.name, gltf => {
        callback(gltf);
      });
    } else if (options.loadType === MTL_OBJ_TYPE) {
      var onProgress = function(xhr) {
      };
      var onError = function() {
      };
      let _this = this;

      if (!this.MTLLoader) {
        this.MTLLoader = new MTLLoader;
      }
      if (!this.OBJLoader) {
        this.OBJLoader = new OBJLoader;
      }
      this.MTLLoader.setPath(url)
      .load(options.materialName, function(materials) {
        // materials.preload();
        _this.OBJLoader.setMaterials(materials).setPath(url)
        .load(options.name, function(object) {
          callback(object)
        }, onProgress, onError);
      });
    } else if (options.loadType === FBX_TYPE) {
      this.FBXLoader = this.FBXLoader || new FBXLoader();
      this.FBXLoader.load(url + options.name, function(object) {
        callback(object);
      });
    }
  },

  /**
   * 解析获取URL
   * @private
   */
  _resolveURL: function(options) {
    if (options.url !== "" && options.url !== undefined) {
      return options.url;
    } else {
      if (options.project) {
        return this.states.config.modelData.modelURL + options.project + "/model/";
      } else {
        return this.states.config.modelData.modelURL + "/model/";
      }
    }
  }
});

/**
 * 坐标方法
 * @param domElement 绘图区
 * @param camera 相机
 * @constructor
 */
PGL.Coordinate = function(domElement, camera) {
  this.domElement = domElement;
  this.camera = camera;
};
Object.assign(PGL.Coordinate.prototype, {
  /**
   * 获取元素obj到左边的距离
   * @param obj
   * @returns {number}
   * @private
   */
  _getOffsetLeft: function(obj) { //获取某元素以浏览器左上角为原点的坐标
    var l = obj.offsetLeft; // 对应父容器的上边距
    //判断是否有父容器，如果存在则累加其边距
    while(obj = obj.offsetParent){//等效 obj = obj.offsetParent;while (obj != undefined)
      l += obj.offsetLeft; //叠加父容器的左边距
    }
    return l;
  },
  /**
   * 获取元素obj到上边的距离
   * @param obj
   * @returns {number}
   * @private
   */
  _getOffsetTop: function(obj) { //获取某元素以浏览器左上角为原点的坐标
    var t = obj.offsetTop; //获取该元素对应父容器的上边距
    //判断是否有父容器，如果存在则累加其边距
    while(obj = obj.offsetParent){//等效 obj = obj.offsetParent;while (obj != undefined)
      t += obj.offsetTop; //叠加父容器的上边距
    }
    return t;
  },
  /**
   * 将鼠标位置的屏幕坐标转成threejs中的标准坐标
   * @param event
   * @returns {Vector2}
   */
  getThreeCoordinate: function(event) {
    // var left = this._getOffsetLeft(this.domElement);
    // var top = this._getOffsetTop(this.domElement);
    let clientRect = this.domElement.getBoundingClientRect();
    let left = clientRect.left;
    let top = clientRect.top;
    let width = clientRect.width;
    let height = clientRect.height;

    let mouse = new THREE.Vector2();
    if (event.type.indexOf("touch") > -1) {
      mouse.x = ((event.changedTouches[0].clientX - left) / width) * 2 - 1;
      mouse.y = -((event.changedTouches[0].clientY - top) / height) * 2 + 1;

    } else {
      mouse.x = ((event.clientX - left) / width) * 2 - 1;
      mouse.y = -((event.clientY - top) / height) * 2 + 1;
    }
    return mouse;
  },
  /**
   * 将threejs中的标准坐标转成屏幕坐标
   * @param data 三维坐标
   * @deprecated
   * @see getScreenCoordinate2
   * @returns {THREE.Vector2}
   */
  getScreenCoordinate: function(data) {
    if (!(this.domElement && this.camera)) {
      console.error("某有传入相机或者绘图区");
      return null;
    }

    // 三维坐标
    let vec3 = new THREE.Vector3();
    if (data.constructor === THREE.Vector3) {
      vec3.copy(data);
    } else if (data.constructor === String) {
      vec3.fromString(data);
    }
    vec3.project(this.camera);

    // 计算相对于父元素的定位值
    let mouse = new THREE.Vector2();
    mouse.x = (0.5 + vec3.x * 0.5) * this.domElement.offsetWidth + this.domElement.offsetLeft;
    mouse.y = (0.5 - vec3.y * 0.5) * this.domElement.offsetHeight + this.domElement.offsetTop;
    return mouse;
  },
  /**
   * 将threejs中的标准坐标转成屏幕坐标
   * @param data 三维坐标
   * @returns {Vector2}
   */
  getScreenCoordinate2: function(data) {
    if (!(this.domElement && this.camera)) {
      console.error("某有传入相机或者绘图区");
      return null;
    }

    // 三维坐标
    let vec3 = new THREE.Vector3();
    if (data.constructor === THREE.Vector3) {
      vec3.copy(data);
    } else if (data.constructor === String) {
      vec3.fromString(data);
    }
    vec3.project(this.camera);

    // 计算相对于父元素的定位值
    let mouse = new THREE.Vector2();
    mouse.x = (0.5 + vec3.x * 0.5) * this.domElement.offsetWidth;
    mouse.y = (0.5 - vec3.y * 0.5) * this.domElement.offsetHeight;
    return mouse;
  },
  /**
   * 检测三维点是否可见
   * @param scene 场景
   * @param data 数据
   */
  isVisible: function(scene, data) {
    let origin = new THREE.Vector3();
    origin.fromData(data);

    var end = new THREE.Vector3();
    end.setFromMatrixPosition(this.camera.matrixWorld);
    var dir = end.sub(origin).normalize();

    var raycaster = new THREE.Raycaster(origin, dir);

    var object = raycaster.intersectObject(scene, true);
    if (object.length > 0) {
      return false;
    } else {
    }

    return true;
  },

  /**
   * 根据mesh计算坐标
   * @param mesh
   * @returns {Vector3|Vector3}
   */
  calculate3Coordinates: function(mesh) {
    mesh.geometry.computeBoundingBox();
    let box = mesh.geometry.boundingBox;
    mesh.updateWorldMatrix(true);

    let vec3 = new THREE.Vector3();
    vec3.addVectors(box.max, box.min).divideScalar(2.0);
    vec3.applyMatrix4(mesh.matrixWorld);
    return vec3;
  }
});

/**
 * 射线的相关方法
 * @param camera：相机
 * @param scene：场景
 * @param options = {
 *    domElement: 操作的dom结构
 *    objects{Array}： 射线查找的物体 scene.children
 *    enableDetection{Boolean}：设置是否启动碰撞检测 false
 *    enabledChangeMaterialColor{Boolean}：控制碰撞检测是否显示颜色 false
 *    enabledClick{Boolean}：控制是否开启点选功能
 *  }
 * @constructor
 */
PGL.RayControls = function(camera, scene, options) {

  // 初始化参数
  options = options || {};
  this.camera = camera; // 相机
  this.scene = scene; // 场景
  this.domElement = (options.domElement !== undefined) ? options.domElement : document; // 事件绑定的dom，默认为整个文档
  this.objects = options.objects !== undefined ? options.objects : this.scene.children; // 射线查找的物体

  // 鼠标事件相关属性
  // 常量值
  this.MOUSEDOWN = "mouseDown";
  this.MOUSEMOVE = "mouseMove";
  this.MOUSEDOWNMOVE = "mouseDownMove"; // 按下鼠标并移动
  this.MOUSEDOWNNOMOVE = "mouseDownNoMove"; // 按下鼠标没有移动
  this.MOUSENO = "mouseNo";
  this.mouseState = this.MOUSENO; // 记录鼠标的状态

  this.mouseX = 0; // 鼠标的位置
  this.mouseY = 0;

  this.mouse = new THREE.Vector2(); // threejs中的标准坐标

  // 拾取物体
  this.raycaster = new THREE.Raycaster();
  this.filterMesh = false; // 射线拾取只返回mesh
  this.filterX = null; // 射线拾取时，返回小于filterX值的项
  this.filterY = null; // 射线拾取时，返回小于filterY值的项
  this.filterZ = null; // 射线拾取时，返回小于filterZ值的项

  // 点选物体所用到的参数
  this.enabledClick = options.enabledClick !== undefined ? options.enabledClick : true; // 是否启用点选功能

  // 添加事件
  this.initEvent();
};
Object.assign(PGL.RayControls.prototype, {
  /**
   * 重置属性
   * @param options 重置参数
   *  options = {
   *    camera：相机
   *    scene：场景
   *    domElement: 操作的dom结构
   *    objects{Array}： 射线查找的物体 scene.children
   *    enableDetection{Boolean}：设置是否启动碰撞检测 false
   *    enabledChangeMaterialColor{Boolean}：控制碰撞检测是否显示颜色 false
   *    enabledClick{Boolean}：控制是否开启点选功能
   *  }
   *
   */
  reset: function(options) {
    options = options || {};
    if (options.camera !== undefined) {
      this.camera = options.camera;
    }
    if (options.scene !== undefined) {
      this.scene = options.scene;
    }
    if (options.domElement !== undefined) {
      this.domElement = options.domElement;
    }
    if (options.objects !== undefined) {
      this.objects = options.objects;
    }
    if (options.enableDetection !== undefined) {
      this.enableDetection = options.enableDetection;
    }
  },
  /************************ 点击事件相关方法*****************************/
  /**
   * 点击事件，改变选中几何体的颜色
   * @param event
   * @private
   */
  _selectObjects: function(event) {
    this.coordinate = new PGL.Coordinate(this.domElement);
    this.mouse.copy(this.coordinate.getThreeCoordinate(event));
    var intersects = this._intersectObjects(this.objects, {
      filterMesh: this.filterMesh,
      filterX: this.filterX,
      filterY: this.filterY,
      filterZ: this.filterZ
    });

    var mesh = null;
    var firstObject = null;
    if (intersects.length > 0) {
      firstObject = intersects[0];
      mesh = this._findFirstMesh(intersects);
    }

    // 调用函数，返回第一个选中对象
    if (this.selectFirstObjectCallBack) {
      this.selectFirstObjectCallBack(firstObject);
    }
    // 调用返回函数
    if (this.selectFirstMeshCallBack) {
      this.selectFirstMeshCallBack(mesh);
    }
  },

  /************************ 射线检测相关的方法***************************/
  /**
   * 射线查找物体
   * @param objects：查找的数组
   * @param option：控制可选参数
   *  filterMesh：是否过滤出mesh
   *  filterX：过滤x值大小
   *  filterY：过滤y值大小
   *  filterZ：过滤z值大小
   * @returns {Array}
   * @private
   */
  _intersectObjects: function(objects, option) {
    option = option || {};
    var result = [];
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var intersects = this.raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
      if (option.filterMesh || option.filterX || option.filterY || option.filterZ) {
        for (var i = 0; i < intersects.length; i++) {
          if (!option.filterMesh || (option.filterMesh && intersects[i].object instanceof THREE.Mesh)) {
            var isFilter = false;
            if (option.filterX && (intersects[i].point.x > option.filterX)) {
              isFilter = true;
            }
            if (option.filterY && (intersects[i].point.y > option.filterY)) {
              isFilter = true;
            }
            if (option.filterZ && (intersects[i].point.z > option.filterZ)) {
              isFilter = true;
            }

            if (!isFilter) {
              result.push(intersects[i]);
            }
          }
        }
      } else {
        result = intersects;
      }
    }

    if (result.length < 0) result = null;
    return result;
  },
  /**
   * 射线查找物体（适用于碰撞检测）
   * @param objects：查找的数组
   * @param cameraEnd{THREE.Vector3}：相机坐标中的结束点坐标
   * @returns {Array}
   */
  intersectObjectsByCameraLocal: function(objects, cameraEnd) {
    var result = [];

    var origin = new THREE.Vector3();
    origin.setFromMatrixPosition(this.camera.matrixWorld);
    var end = this.camera.localToWorld(cameraEnd);
    this.raycaster.set(origin, end.sub(origin).normalize());

    var intersects = this.raycaster.intersectObjects(objects, true);
    if (intersects.length > 0) {
      result = intersects;
    }

    return result;
  },
  /**
   * 射线查找物体
   * @param objects 范围
   * @param origin 起点
   * @param direction 方向
   * @return {Array}
   */
  intersectObjects: function(objects, origin, direction) {
    var result = [];
    this.raycaster.set(origin, direction);
    var intersects = this.raycaster.intersectObjects(objects, true);
    if (intersects.length > 0) {
      result = intersects;
    }

    return result;
  },
  /**
   * 检测相机离地高度
   * @param objects
   * @param characterPosition 人物相对于相机的坐标
   */
  checkCameraHeight: function(objects, characterPosition) {
    var origin = new THREE.Vector3();
    origin.setFromMatrixPosition(this.camera.matrixWorld);

    var intersects = this.intersectObjects(objects, new THREE.Vector3(characterPosition.x, origin.y, characterPosition.z), new THREE.Vector3(0, -1, 0));
    var distance = 8;
    if (intersects.length > 0) {
      distance = intersects[0].distance;
    }
    return distance;
  },
  /**
   * 根据射线查找结果，获取第一个有效的网格
   * @param intersects
   * @return {null}
   * @private
   */
  _findFirstMesh: function(intersects) {
    for (var i = 0; i < intersects.length; i++) {
      if (intersects[i].object.constructor === THREE.Mesh) {
        return intersects[i].object;
      }
    }
    return null;
  },

  /************************** 事件 *********************************************/
  initEvent: function() {
    this._onMouseMove = this._bind(this, this.onMouseMove);
    this._onMouseDown = this._bind(this, this.onMouseDown);
    this._onMouseUp = this._bind(this, this.onMouseUp);

    this.domElement.addEventListener('mousemove', this._onMouseMove, false);
    this.domElement.addEventListener('mousedown', this._onMouseDown, false);
    this.domElement.addEventListener('mouseup', this._onMouseUp, false);

    this.domElement.addEventListener('touchmove', this._onMouseMove, false);
    this.domElement.addEventListener('touchstart', this._onMouseDown, false);
    this.domElement.addEventListener('touchend', this._onMouseUp, false);
  },

  _bind: function(scope, fn) {
    return function() {
      fn.apply(scope, arguments);
    };
  },

  onMouseDown: function(event) {
    event.preventDefault();
    // event.stopPropagation();
    // console.log("射线：onMouseDown");

    this.mouseState = this.MOUSEDOWN;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  },
  onMouseMove: function(event) {
    event.preventDefault();
    // event.stopPropagation();
    // console.log("射线：onMouseMove");

    // 设置鼠标状态
    if ((this.mouseState === this.MOUSEDOWN) || (this.mouseState === this.MOUSEDOWNMOVE)) {
      if (this.mouseX === event.clientX && this.mouseY === event.clientY) {
        this.mouseState = this.MOUSEDOWNNOMOVE;
      } else {
        this.mouseState = this.MOUSEDOWNMOVE;
      }
    } else {
      this.mouseState = this.MOUSEMOVE;
    }
  },
  onMouseUp: function(event) {
    event.preventDefault();
    // event.stopPropagation();
    // console.log("射线：onMouseUp");

    // 触发拾取功能
    if (this.enabledClick) {
      if (this.mouseState === this.MOUSEDOWNNOMOVE || this.mouseState === this.MOUSEDOWN) {
        this._selectObjects(event);
      }
    }

    this.mouseState = this.MOUSENO;
  },

  /**
   * 删除鼠标事件
   */
  dispose: function() {
    this.domElement.removeEventListener('mousedown', this._onMouseDown, false);
    this.domElement.removeEventListener('mouseup', this._onMouseMove, false);
    this.domElement.removeEventListener('mousemove', this._onMouseUp, false);
  },

  /**************************** 返回函数 **********************************/
  /**
   * 点选返回第一个对象
   * @param object
   */
  selectFirstObjectCallBack: function(object) {
  },
  /**
   * 点选返回第一个对象
   * @param mesh
   */
  selectFirstMeshCallBack: function(mesh) {
  }
});

/**
 * 根据参数生成天空盒子加到场景的背景上
 */
PGL.SkyBox = function(scene, baseFileUrl) {
  this.scene = scene;
  this.baseFileUrl = baseFileUrl;

  this.cubePic = {
    "skyboxsun25deg": ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    "skybox": ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    "MilkyWay": ['dark-s_px.jpg', 'dark-s_nx.jpg', 'dark-s_py.jpg', 'dark-s_ny.jpg', 'dark-s_pz.jpg', 'dark-s_nz.jpg']
  };
};
Object.assign(PGL.SkyBox.prototype, {

  constructor: PGL.SkyBox,

  update: function(fileName) {

    if (!fileName) {
      fileName = "skyboxsun25deg"
    }

    var loader = new THREE.CubeTextureLoader();
    loader.setPath(this.baseFileUrl + fileName + '/');
    this.scene.background = loader.load(this.cubePic[fileName], function(img) {
      // console.log(img);
    }, function(pro) {

    }, function(err) {
      // console.log(err);
    });
  }
});

/**
 * 背景效果实现
 * @param scene
 * @param states 状态机
 * @constructor
 */
PGL.SceneBackground = function(scene, states) {
  this.scene = scene;
  this.states = states;

  this.types = [NONE_TYPE, COLOR_TYPE, GRADIENT_TYPE, SKY_BOX_TYPE, IMG_TYPE]; // 背景类型集合

  // GUI相关变量
  this.controllers = {}; // 保存控制器
};
Object.assign(PGL.SceneBackground.prototype, {
  /**
   * 更新背景类型
   * @returns {null}
   */
  updateType: function() {
    if (!this.scene) {
      return null;
    }

    var options = this.states.config.scene.background;
    var baseURL = this.states.config.sourceURL;

    switch(options.type){
      case NONE_TYPE:
        this.scene.background = null;
        break;
      case GRADIENT_TYPE:
        this.scene.background = this._createGradientMap(options.startColor, options.endColor);
        break;
      case COLOR_TYPE:
        this.scene.background = new THREE.Color(options.color);
        break;
      case IMG_TYPE:
        this.scene.background = new THREE.TextureLoader().load(baseURL + "/textures/background/" + options.imgName);
        break;
      case SKY_BOX_TYPE:
        this.skyBox = new PGL.SkyBox(this.scene, baseURL + "/textures/background/cube/");
        this.skyBox.update(options.skyBoxType);
        break;
      case SKY_BOX_SPHERE_TYPE:
        this._addSkySphere(baseURL + "/textures/background/" + options.filename);
        break;
      default:
        console.error("背景类型不存在！")
    }
  },
  _addSkySphere(url) {
    let texture = new THREE.TextureLoader().load(url);
    let sphereGeometry = new THREE.SphereGeometry(700, 50, 50);
    sphereGeometry.scale(-1, 1, 1);
    let sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture
    });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(sphere);
  },
  /**
   * 创建渐变贴图
   * @param startColor 开始颜色
   * @param endColor 结束颜色
   * @returns {CanvasTexture|CanvasTexture}
   * @private
   */
  _createGradientMap: function(startColor, endColor) {
    let canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    let ctx = canvas.getContext("2d");
    let grad = ctx.createLinearGradient(0, 0, 0, 256); //创建一个渐变色线性对象
    grad.addColorStop(0, startColor); //定义渐变色颜色#233a43
    grad.addColorStop(1, endColor);
    ctx.fillStyle = grad; //设置fillStyle为当前的渐变对象
    ctx.fillRect(0, 0, 256, 256); //绘制渐变图形

    // return canvas;
    return new THREE.CanvasTexture(canvas);
  },

  /********************** GUI ****************************/
  /**
   * 初始化参数
   */
  initGUI: function() {
    this.controllers = {};
  },
  /**
   * 启动GUI控制
   * @param gui
   */
  enableGUI: function(gui) {
    var scope = this;
    var params = {
      type: this.states.config.scene.background.type
    };
    var sceneBackgroundFolder = gui.addFolder("背景控制");
    sceneBackgroundFolder.add(params, "type", this.types).name("背景类型").onFinishChange(function(val) {
      scope._changeTypeController(this.__gui, val, scope.states.config);
    });

    this._addCurrentController(sceneBackgroundFolder, this.states.config.scene.background.type);
  },
  /**
   * 修改控制
   * @param gui
   * @param type 切换背景类型
   * @param config 配置
   * @private
   */
  _changeTypeController: function(gui, type, config) {
    var currentType = this.states.config.scene.background.type;
    if (currentType === type) return;

    this._removeBeforeController(gui, currentType);

    this.states.config.scene.background.type = type;
    this.updateType();

    this._addCurrentController(gui, type, config);
  },
  /**
   * 删除上一个类型的控制器
   * @param gui
   * @param type
   * @private
   */
  _removeBeforeController: function(gui, type) {

    var controllers = this.controllers[type] || [];
    for (var i = 0; i < controllers.length; i++) {
      gui.remove(controllers[i]);
    }
    this.controllers[type] = [];
  },
  /**
   * 根据类型添加控制器
   * @param gui
   * @param type
   * @param config
   * @private
   */
  _addCurrentController: function(gui, type, config) {
    switch(type){
      case NONE_TYPE:
      case SKY_BOX_SPHERE_TYPE:
        break;
      case COLOR_TYPE:
        this._add_controller_color_type(gui, type, config);
        break;
      case GRADIENT_TYPE:
        this._add_controller_gradient_type(gui, type, config);
        break;
      case IMG_TYPE:
        this._add_controller_img_type(gui, type, config);
        break;
      case SKY_BOX_TYPE:
        this._add_controller_sky_box_type(gui, type, config);
        break;
      default:
        console.error("背景类型不存在！");
    }
  },
  /**
   * 添加渐变控制器
   * @param gui
   * @param type 类型
   * @private
   */
  _add_controller_gradient_type: function(gui, type) {
    var scope = this;
    var backgroundConfig = this.states.config.scene.background;

    this.controllers[type] = this.controllers[type] || [];

    var params = {
      startColor: backgroundConfig.startColor,
      endColor: backgroundConfig.endColor
    };
    var startColorController = gui.addColor(params, "startColor").name("开始颜色").onFinishChange(function(val) {
      scope.scene.background = scope._createGradientMap(backgroundConfig.startColor, backgroundConfig.endColor);

      backgroundConfig.startColor = val;
    });
    this.controllers[type].push(startColorController);
    var endColorController = gui.addColor(params, "endColor").name("结束颜色").onFinishChange(function(val) {
      scope.scene.background = scope._createGradientMap(backgroundConfig.startColor, backgroundConfig.endColor);

      backgroundConfig.endColor = val;
    });
    this.controllers[type].push(endColorController);
  },
  /**
   * 添加背景颜色控制器
   * @param gui
   * @param type
   * @private
   */
  _add_controller_color_type: function(gui, type) {
    var scope = this;
    var backgroundConfig = this.states.config.scene.background;

    this.controllers[type] = this.controllers[type] || [];

    var params = {
      startColor: backgroundConfig.startColor
    };
    var startColorController = gui.addColor(params, "startColor").name("背景颜色").onFinishChange(function(val) {
      scope.scene.background = new THREE.Color(val);

      backgroundConfig.color = val;
    });
    this.controllers[type].push(startColorController);
  },
  /**
   * 添加天空盒子背景控制
   * @param gui
   * @param type
   * @private
   */
  _add_controller_sky_box_type: function(gui, type) {
    var scope = this;
    var backgroundConfig = this.states.config.scene.background;

    this.controllers[type] = this.controllers[type] || [];

    var params = {
      skyBoxType: backgroundConfig.skyBoxType
    };
    var filenameController = gui.add(params, 'skyBoxType', [SKY_BOX_SUN_25_DEG, SKY_BOX, MILKY_WAY]).name("天空盒子").onFinishChange(function(value) {
      scope.skyBox.update(value);

      backgroundConfig.skyBoxType = value;
    });
    this.controllers[type].push(filenameController);
  },
  /**
   * 添加背景图片切换控制
   * @param gui
   * @param type
   * @private
   */
  _add_controller_img_type: function(gui, type) {
    var scope = this;
    var backgroundConfig = this.states.config.scene.background;

    this.controllers[type] = this.controllers[type] || [];

    var params = {
      imgName: backgroundConfig.imgName
    };
    var filenameController = gui.add(params, 'imgName', ["bg1.jpg", "sky.png"]).name("天空盒子").onFinishChange(function(value) {
      scope.scene.background = new THREE.TextureLoader().load(scope.states.config.sourceURL + "/textures/background/" + value);

      backgroundConfig.imgName = value;
    });
    this.controllers[type].push(filenameController);
  },
});

/**
 * 场景光源管理
 * @param scene 场景
 * @constructor
 */
PGL.ManageLight = function(scene) {
  this.scene = scene;

  this.ambientLight = null;
  this.spotLight = null;
  this.directionalLight = null;
  this.pointLight = null;
};
Object.assign(PGL.ManageLight.prototype, {
  /**
   * 添加环境光
   * @param options 参数
   * @param GUI 参数
   * @param isPower 参数
   */
  addAmbientLight: function(options, GUI, isPower) {

    if (options.intensity === 0 && !GUI.gui && !isPower) {
      return;
    }

    if (!this.ambientLight) {
      this.ambientLight = new THREE.AmbientLight(options.color, options.intensity);
      this.scene.add(this.ambientLight);
    } else {
      this.ambientLight.color.set(options.color);
      this.ambientLight.intensity = options.intensity;
    }

    if (GUI.gui) {
      var ambientLight = this.ambientLight;
      var params = {
        color: ambientLight.color.getHex(),
        intensity: ambientLight.intensity,
      };
      // 环境光控制
      var AmbientLightController = GUI.gui.addFolder("环境光控制");
      AmbientLightController.addColor(params, "color").name("环境光颜色").onChange(function(val) {
        ambientLight.color.setHex(val);
        options.color = val;
      });
      AmbientLightController.add(params, "intensity", 0, params.intensity + 10.0).name("环境光强度").onChange(function(val) {
        ambientLight.intensity = val;
        options.intensity = val;
      });
    }
  },

  /**
   * 添加聚光灯
   * @param options 参数
   *  color: 0xffffff,
   *  distance: 0,
   *  angle: Math.PI / 3,
   *  penumbra: 0,
   *  decay: 1,
   *  position: {
   *    x: 0,
   *    y: 100,
   *    z: 0
   *  },
   *  target:{
   *    x:0,
   *    y:0,
   *    z:0
   *  }
   *  castShadow: false
   * @param GUI
   * @param isPower
   */
  addSpotLight: function(options, GUI, isPower) {

    if (options.intensity === 0 && !GUI.gui && !isPower) {
      if (this.spotLight) {
        this.scene.remove(this.spotLight.target);
        this.scene.remove(this.spotLight);
        this.spotLight = null;
      }
      if (this.spotLightHelper) {
        this.scene.remove(this.spotLightHelper);
        this.spotLightHelper.dispose();
        this.spotLightHelper = null;
      }
      return;
    }

    if (this.spotLight) {
      this.spotLight.color.add(new THREE.Color(options.color));
      this.spotLight.intensity = options.intensity;
      this.spotLight.distance = options.distance;
      this.spotLight.angle = options.angle;
      this.spotLight.penumbra = options.penumbra;
      this.spotLight.decay = options.decay;
    } else {
      this.spotLight = new THREE.SpotLight(options.color, options.intensity, options.distance, options.angle, options.penumbra, options.decay);
      this.spotLight.shadow.mapSize.width = 1024;
      this.spotLight.shadow.mapSize.height = 1024;

      this.spotLight.shadow.camera.near = 0.1;
      this.spotLight.shadow.camera.far = 200;
      this.spotLight.shadow.camera.fov = 60;

      this.scene.add(this.spotLight);
      this.scene.add(this.spotLight.target);
    }
    this.spotLight.position.set(options.position.x, options.position.y, options.position.z);
    this.spotLight.castShadow = options.castShadow;

    if (GUI.gui || isPower) {
      this.addSpotLightHelper();
    } else {
      if (this.spotLightHelper) {
        this.scene.remove(this.spotLightHelper);
        this.spotLightHelper.dispose();
        this.spotLightHelper = null;
      }
    }

    if (GUI.gui) {
      var _this = this;
      var params = {
        color: _this.spotLight.color.getHex(),
        castShadow: _this.spotLight.castShadow,
        intensity: _this.spotLight.intensity,
        distance: _this.spotLight.distance,
        angle: _this.spotLight.angle,
        penumbra: _this.spotLight.penumbra,
        decay: _this.spotLight.decay,
        positionX: _this.spotLight.position.x,
        positionY: _this.spotLight.position.y,
        positionZ: _this.spotLight.position.z,
        targetX: _this.spotLight.target.position.x,
        targetY: _this.spotLight.target.position.y,
        targetZ: _this.spotLight.target.position.z,
      };

      this.spotLightControll = GUI.gui.addFolder("聚光灯控制");
      this.spotLightControll.addColor(params, 'color').onChange(function(val) {
        _this.spotLight.color.setHex(val);
        options.color = val;
      });
      this.spotLightControll.add(params, 'castShadow').name("开启阴影").onChange(function(val) {
        _this.spotLight.castShadow = val;
        options.castShadow = val;
      });
      this.spotLightControll.add(params, 'intensity', 0, params.intensity + 10).onChange(function(val) {
        _this.spotLight.intensity = val;
        options.intensity = val;
      });
      this.spotLightControll.add(params, 'distance', 0, params.distance + 50).onChange(function(val) {
        _this.spotLight.distance = val;
        _this.spotLightHelper.update();

        options.distance = val;
      });
      this.spotLightControll.add(params, 'angle', 0, Math.PI / 2).onChange(function(val) {
        _this.spotLight.angle = val;
        _this.spotLightHelper.update();

        options.angle = val;
      });
      this.spotLightControll.add(params, 'penumbra', 0, 1).step(0.1).onChange(function(val) {
        _this.spotLight.penumbra = val;
        _this.spotLightHelper.update();

        options.penumbra = val;
      });
      this.spotLightControll.add(params, 'decay', 1, 2).onChange(function(val) {
        _this.spotLight.decay = val;
        _this.spotLightHelper.update();

        options.decay = val;
      });
      this.spotLightControll.add(params, 'positionX', params.positionX - 100, params.positionX + 100).onChange(function(val) {
        _this.spotLight.position.x = val;
        _this.spotLightHelper.update();

        options.position.x = val;
      });
      this.spotLightControll.add(params, 'positionY', params.positionY - 100, params.positionY + 100).onChange(function(val) {
        _this.spotLight.position.y = val;
        _this.spotLightHelper.update();

        options.position.y = val;
      });
      this.spotLightControll.add(params, 'positionZ', params.positionZ - 100, params.positionZ + 100).onChange(function(val) {
        _this.spotLight.position.z = val;
        _this.spotLightHelper.update();

        options.position.z = val;
      });
      this.spotLightControll.add(params, 'targetX', params.targetX - 100, params.targetX + 100).onChange(function(val) {
        _this.spotLight.target.position.x = val;
        _this.spotLight.target.updateMatrixWorld();
        _this.spotLightHelper.update();

        options.target.x = val;
      });
      this.spotLightControll.add(params, 'targetY', params.targetY - 100, params.targetY + 100).onChange(function(val) {
        _this.spotLight.target.position.y = val;
        _this.spotLight.target.updateMatrixWorld();
        _this.spotLightHelper.update();

        options.target.y = val;
      });
      this.spotLightControll.add(params, 'targetZ', params.targetZ - 100, params.targetZ + 100).onChange(function(val) {
        _this.spotLight.target.position.z = val;
        _this.spotLight.target.updateMatrixWorld();
        _this.spotLightHelper.update();

        options.target.z = val;
      });
    }
  },
  addSpotLightHelper: function() {
    if (!this.spotLightHelper) {
      this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
      this.scene.add(this.spotLightHelper);
    }
  },

  /**
   * 平行光
   * @param options 参数
   *  color: 0xffffff,
   *  distance: 0,
   *  angle: Math.PI / 3,
   *  penumbra: 0,
   *  decay: 1,
   *  position: {
   *    x: 0,
   *    y: 100,
   *    z: 0
   *  },
   *  castShadow: false
   * @param GUI
   * @param isPower
   */
  addDirectionalLight: function(options, GUI, isPower) {

    if (options.intensity === 0 && !GUI.gui && !isPower) {
      if (this.directionalLight) {
        this.scene.remove(this.directionalLight.target);
        this.scene.remove(this.directionalLight);
        this.directionalLight = null;
      }
      if (this.directionalLightHelper) {
        this.scene.remove(this.directionalLightHelper);
        this.directionalLightHelper.dispose();
        this.directionalLightHelper = null;
      }
      return;
    }

    // 添加平行光
    if (!this.directionalLight) {
      this.directionalLight = new THREE.DirectionalLight(options.color, options.intensity);
      this.directionalLight.shadow.camera.top = 50;
      this.directionalLight.shadow.camera.bottom = -25;
      this.directionalLight.shadow.camera.left = -25;
      this.directionalLight.shadow.camera.right = 25;
      this.directionalLight.shadow.camera.near = 0.1;
      this.directionalLight.shadow.camera.far = 200;
      this.directionalLight.shadow.mapSize.set(1024, 1024);
      this.scene.add(this.directionalLight);
      this.scene.add(this.directionalLight.target);
    } else {
      this.directionalLight.color.set(options.color);
      this.directionalLight.intensity = options.intensity;
    }
    this.directionalLight.position.set(options.position.x, options.position.y, options.position.z);
    this.directionalLight.castShadow = options.castShadow;

    if (GUI.gui || isPower) {
      this.addDirectionalLightHelper();
    } else {
      if (this.directionalLightHelper) {
        this.scene.remove(this.directionalLightHelper);
        this.directionalLightHelper.dispose();
        this.directionalLightHelper = null;
      }
    }

    if (GUI.gui) {
      var _this = this;

      // 平行光
      var params = {
        color: _this.directionalLight.color.getHex(),
        castShadow: _this.directionalLight.castShadow,
        intensity: _this.directionalLight.intensity,
        positionX: _this.directionalLight.position.x,
        positionY: _this.directionalLight.position.y,
        positionZ: _this.directionalLight.position.z,
        targetX: _this.directionalLight.target.position.x,
        targetY: _this.directionalLight.target.position.y,
        targetZ: _this.directionalLight.target.position.z,
      };
      var directionalLightController = GUI.gui.addFolder("平行光控制");
      directionalLightController.addColor(params, "color").name("平行光颜色").onChange(function(val) {
        _this.directionalLight.color.setHex(val);

        options.color = val;
      });
      directionalLightController.add(params, "castShadow").name("开启阴影").onChange(function(val) {
        _this.directionalLight.castShadow = val;

        options.castShadow = val;
      });
      directionalLightController.add(params, "intensity", 0, 5.0, 0.1).name("平行光强度").onChange(function(val) {
        _this.directionalLight.intensity = val;

        options.intensity = val;
      });
      directionalLightController.add(params, "positionX", params.positionX - 100, params.positionX + 100, 0.1).name("x").onChange(function(val) {
        _this.directionalLight.position.x = val;
        _this.directionalLightHelper.update();

        options.position.x = val;
      });
      directionalLightController.add(params, "positionY", params.positionY - 100, params.positionY + 100, 0.1).name("y").onChange(function(val) {
        _this.directionalLight.position.y = val;
        _this.directionalLightHelper.update();

        options.position.y = val;
      });
      directionalLightController.add(params, "positionZ", params.positionZ - 100, params.positionZ + 100, 0.1).name("z").onChange(function(val) {
        _this.directionalLight.position.z = val;
        _this.directionalLightHelper.update();

        options.position.z = val;
      });
      directionalLightController.add(params, "targetX", params.targetX - 100, params.targetX + 100, 0.1).name("tar_x").onChange(function(val) {
        _this.directionalLight.target.position.x = val;
        _this.directionalLight.target.updateMatrixWorld();
        _this.directionalLightHelper.update();

        options.target.x = val;
      });
      directionalLightController.add(params, "targetY", params.targetY - 100, params.targetY + 100, 0.1).name("tar_y").onChange(function(val) {
        _this.directionalLight.target.position.y = val;
        _this.directionalLight.target.updateMatrixWorld();
        _this.directionalLightHelper.update();

        options.target.y = val;
      });
      directionalLightController.add(params, "targetZ", params.targetZ - 100, params.targetZ + 100, 0.1).name("tar_z").onChange(function(val) {
        _this.directionalLight.target.position.z = val;
        _this.directionalLight.target.updateMatrixWorld();
        _this.directionalLightHelper.update();

        options.target.z = val;
      });
    }
  },
  addDirectionalLightHelper: function() {
    if (!this.directionalLightHelper) {
      this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5, 0xff0000);
      this.scene.add(this.directionalLightHelper);
    }
  },

  /**
   * 点光源
   * @param options
   * @param GUI
   * @param isPower
   */
  addPointLight: function(options, GUI, isPower) {

    if (options.intensity === 0 && !GUI.gui && !isPower) {

      if (this.pointLight) {
        this.scene.remove(this.pointLight);
        this.pointLight = null;
      }
      if (this.pointLightHelper) {
        this.scene.remove(this.pointLightHelper);
        this.pointLightHelper.dispose();
        this.pointLightHelper = null;
      }
      return;
    }

    // 添加点光源
    if (!this.pointLight) {
      this.pointLight = new THREE.PointLight(options.color, options.intensity, options.distance, options.decay);
      this.scene.add(this.pointLight);
    } else {
      this.pointLight.color.set(options.color);
      this.pointLight.intensity = options.intensity;
      this.pointLight.distance = options.distance;
      this.pointLight.decay = options.decay;
    }

    this.pointLight.position.set(options.position.x, options.position.y, options.position.z);
    this.pointLight.castShadow = options.castShadow;

    if (GUI.gui || isPower) {
      this.addPointLightHelper();
    } else {
      if (this.pointLightHelper) {
        this.scene.remove(this.pointLightHelper);
        this.pointLightHelper.dispose();
        this.pointLightHelper = null;
      }
    }

    if (GUI.gui) {
      var _this = this;

      var params = {
        color: _this.pointLight.color.getHex(),
        castShadow: _this.pointLight.castShadow,
        intensity: _this.pointLight.intensity,
        distance: _this.pointLight.distance,
        decay: _this.pointLight.decay,
        positionX: _this.pointLight.position.x,
        positionY: _this.pointLight.position.y,
        positionZ: _this.pointLight.position.z
      };

      // 点光源控制
      var pointLightController = GUI.gui.addFolder("点光源控制");
      pointLightController.addColor(params, "color").name("点光源颜色").onChange(function(val) {
        _this.pointLight.color.setHex(val);

        options.color = val;
      });
      pointLightController.add(params, "castShadow").name("开启阴影").onChange(function(val) {
        _this.pointLight.castShadow = val;

        options.castShadow = val;
      });
      pointLightController.add(params, "intensity", 0, 5.0, 0.1).name("点光源强度").onChange(function(val) {
        _this.pointLight.intensity = val;

        options.intensity = val;
      });
      pointLightController.add(params, "distance", params.distance - 100, params.distance + 100, 1).name("点光源距离").onChange(function(val) {
        _this.pointLight.distance = val;

        options.distance = val;
      });
      pointLightController.add(params, "decay", params.decay - 20, params.decay + 20, 1).name("点光源衰减").onChange(function(val) {
        _this.pointLight.decay = val;

        options.decay = val;
      });
      pointLightController.add(params, "positionX", params.positionX - 100, params.positionX + 100, 0.1).name("x").onChange(function(val) {
        _this.pointLight.position.x = val;

        options.position.x = val;
      });
      pointLightController.add(params, "positionY", params.positionY - 100, params.positionY + 100, 0.1).name("y").onChange(function(val) {
        _this.pointLight.position.y = val;

        options.position.y = val;
      });
      pointLightController.add(params, "positionZ", params.positionZ - 100, params.positionZ + 100, 0.1).name("z").onChange(function(val) {
        _this.pointLight.position.z = val;

        options.position.z = val;
      });
    }
  },
  addPointLightHelper: function() {
    if (!this.pointLightHelper) {
      var sphereSize = 2;
      this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, sphereSize, 0x00ff00);
      this.scene.add(this.pointLightHelper);
    }
  }
});

/**
 * 流线
 * @constructor
 */
PGL.Streamline = function(line, states) {

  this.states = states;

  this.type = 0;

  this.mesh = null;
  this.geometry = null;
  this.material = null;

  this.texture = null;
  this.textureLoader = new THREE.TextureLoader();

  this._createLine(line);
};
Object.assign(PGL.Streamline.prototype, {
  /**
   * 创建流线
   * @param line
   */
  _createLine: function(line) {
    var _this = this;
    var baseURL = this.states.config.sourceURL;

    let centerPoint = new THREE.Vector3();
    centerPoint.x = (line.startPoint.x + line.endPoint.x) / 2;
    centerPoint.z = (line.startPoint.z + line.endPoint.z) / 2;
    centerPoint.y = line.startPoint.distanceTo(line.endPoint) / 2 * 1.5;

    var path = new THREE.QuadraticBezierCurve3();
    path.v0 = line.startPoint;
    path.v1 = centerPoint;
    path.v2 = line.endPoint;

    this.geometry = new THREE.TubeGeometry(path, 100, 0.1, 4, false);

    var material = new THREE.MeshStandardMaterial();
    material.name = "ceshi";

    let fileName = line.colorURLName || "05.png";
    this.textureLoader.load(baseURL + "/textures/streamline/" + fileName, function(texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(0.5, 0.5);
      // texture.rotation = Math.PI;
      texture.offset.set(0.7, 0.7);
      material.map = texture;
      material.transparent = true;
      material.needsUpdate = true;

      _this.texture = texture;
    });

    this.material = material;

    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.name = line.name;
  },

  dispose: function() {
    this.beforeDispose();
    this.material.dispose();
    this.geometry.dispose();

    this.mesh = null;
    this.geometry = null;
    this.material = null;
  },

  update: function() {
    if (this.texture) {

      if (this.texture.offset.x > 1.8 && this.type === 1) {
        this.dispose();
      } else {
        this.texture.offset.x += 0.01;
      }
    }
  },

  beforeDispose: function() {

  }
});

/**
 * 流线管理
 * @constructor
 */
PGL.Streamlines = function(scene, states) {

  this.scene = scene;
  this.states = states;
  this.lines = {};
};
Object.assign(PGL.Streamlines.prototype, {
  /**
   * 添加流线
   * @param line
   * @param type
   */
  addStreamline: function(line, type) {

    if (this.lines[line.name] === undefined) {
      let streamline = new PGL.Streamline(line, this.states);
      streamline.type = type;

      let _this = this;
      streamline.beforeDispose = function() {
        _this.scene.remove(_this.lines[line.name].mesh);
        delete _this.lines[line.name];
      };

      this.lines[line.name] = streamline;

      this.scene.add(streamline.mesh);
    }
  },
  /**
   * 添加流线
   * @param lines
   * @param type
   */
  addStreamlines: function(lines, type) {

    for (var i = 0; i < lines.length; i++) {
      this.addStreamline(lines[i], type);
    }
  },

  /**
   * 删除所有的流线
   */
  removeALLStreamlines: function() {
    for (let name in this.lines) {
      this.scene.remove(this.lines[name].mesh);
      this.lines[name].dispose();
    }

    this.lines = {};
  },

  /**
   * 更新流线
   */
  update: function() {

    for (let name in this.lines) {
      this.lines[name].update();
    }
  }
});

/************************* 控制面板start ***************************************************/

/**
 * 控制面板
 * @constructor
 */
PGL.GUI = function() {
  this.gui = null;
  this.domElement = null;
};
Object.assign(PGL.GUI.prototype, {
  /**
   * 设置挂载点
   * @param container
   */
  setContainer: function(container) {
    if (!container) return;
    container.setAttribute("style", "position:relative;");
    container.appendChild(this.domElement);
  },
  /**
   * 创建控制器
   */
  createGUI: function() {
    if (this.gui) {
      this.destroy();
    }
    this.gui = new dat.GUI();
    this.domElement = this.gui.domElement.parentElement;
    this.domElement.setAttribute("style", "position:absolute;overflow: visible;right:0;top:0;z-index:999;");
  },
  /**
   * 销毁创建的控制面板
   */
  destroy: function() {
    if (this.gui) {
      this.gui.destroy();
      this.gui = null;
      this.domElement = null;
    }
  },
});

/************************* 控制面板end  ****************************************************/

/************************* 三维标签相关对象 ************************************************/
/**
 * 标签基类
 * @param states 基础路径
 * @param options 参数
 * @constructor
 */
PGL.BaseLabel = function(states, options) {

  this.states = states;

  options = options || {};
  this.pos = options.pos !== undefined ? options.pos : new THREE.Vector3(0, 0, 0);
  this.dynamicType = options.dynamicType !== undefined ? options.dynamicType : DYNAMICTYPE1;
  this.id = options.id;
  this.scale = 1.0;
};
Object.assign(PGL.BaseLabel.prototype, {
  /**
   * 创建标签
   * @param options 参数
   * @private
   */
  init: function(options) {
  },
  /**
   * 动态
   */
  update: function(timer) {
    if (this.dynamicType === DYNAMICTYPE1) {
      this.model.scale.set(this.scale, this.scale, this.scale);
      this.scale += 0.01;
      if (this.scale >= 1.5) {
        this.scale = 1.0;
      }
    }
    if (this.dynamicType === DYNAMICTYPE2) {
      var scale = 0.8 + (Math.sin(timer * 5) + 1.0) / 4;
      this.model.scale.set(scale, scale, scale);

      var opacity = 0.8 - (Math.sin(timer * 5) + 1.0) / 4;
      this._updateMaterial({opacity: opacity});
    }
  },
  /**
   * 更新材质
   * @param options
   * @private
   */
  _updateMaterial: function(options) {
    if (!options) {
      return;
    }

    var materialControl = new PGL.MaterialController();
    materialControl.changeObjectMaterial(this.model, options);
  }
});

/**
 * 管理标签基类
 * @param scene 场景
 * @param states 基础路径
 * @constructor
 */
PGL.BaseLabels = function(scene, states) {
  this.scene = scene;
  this.states = states;

  this.labels = [];
};
Object.assign(PGL.BaseLabels.prototype, {
  /**
   * 更新动态网格
   */
  update: function(timer) {
    for (var i = 0; i < this.labels.length; i++) {
      this.labels[i].update(timer);
    }
  },
  /**
   * 删除标签
   * @param id
   */
  deleteModelLabel: function(id) {
    for (var i = 0; i < this.labels.length; i++) {
      var label = this.labels[i];
      if (label.id === id) {
        this.scene.remove(label.model);

        this.labels.splice(i, 1);
        label.dispose();
        break;
      }
    }
  }
});

/**
 * 三维标签
 * @param baseURL
 * @param options
 * @constructor
 */
PGL.Label = function(baseURL, options) {

  this.baseURL = baseURL;

  options = options || {};
  this.radius = options.radius !== undefined ? options.radius : 1;
  this.segments = options.segments !== undefined ? options.segments : this.radius * 16 + 100;
  this.color = options.color !== undefined ? options.color : 0xff0000;
  this.pos = options.pos !== undefined ? options.pos : new THREE.Vector3(0, 0, 0);
  this.direction = options.direction !== undefined ? options.direction : DIRECTIONZ;
  this.type = options.type !== undefined ? options.type : LABELTYPE1;
  this.dynamicType = options.dynamicType !== undefined ? options.dynamicType : DYNAMICTYPE1;
  this.filename = options.filename !== undefined ? options.filename : "15.png";

  this.id = options.id;

  // 计数
  this.scale = 1.0;

  this._createLabel();
};

Object.assign(PGL.Label.prototype, {
  /**
   * 创建颜色标签
   */
  _createLabel: function() {
    var texture;

    var geometry = new THREE.CircleBufferGeometry(this.radius, this.segments);
    var material = new THREE.MeshBasicMaterial();

    var textureLoader = new THREE.TextureLoader();

    if (this.type === LABELTYPE1) {
      material.map = new THREE.CanvasTexture(this._generateSprite());
      material.transparent = true;
      material.blending = THREE.AdditiveBlending;
      material.side = THREE.DoubleSide;
      material.color.set(this.color);
    } else if (this.type === LABELTYPE2) {
      texture = textureLoader.load(this.baseURL + "/textures/label/" + this.filename);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      material.map = texture;
      material.transparent = true;
      // material.depthFunc = THREE.AlwaysDepth;
      // material.depthTest = true;
      // material.depthWrite = false;
      material.blending = THREE.NormalBlending;
      material.side = THREE.DoubleSide;
    } else if (this.type === LABELTYPE3) {
      texture = textureLoader.load(this.baseURL + "/textures/label/" + this.filename);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      material.map = texture;
      material.transparent = true;
      // material.depthFunc = THREE.AlwaysDepth;
      // material.depthTest = true;
      // material.depthWrite = false;

      material.blending = THREE.NormalBlending;
      material.side = THREE.DoubleSide;
      material.color.set(this.color);
    }

    this.mesh = new THREE.Mesh(geometry, material);

    if (this.direction === REVERSEEDIRECTIONX) {
      this.mesh.rotateY(Math.PI / 2);
    }
    if (this.direction === DIRECTIONY) {
      this.mesh.rotateX(Math.PI / 2);
    }
    this.mesh.position.copy(this.pos);
    if (this.id) {
      this.mesh.userData.id = this.id;
    }
  },

  /**
   * 获取渐变贴图
   * @returns {HTMLCanvasElement}
   */
  _generateSprite: function() {

    // var canvas = document.getElementById('canvas');
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

    // 内圆颜色
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.40, 'rgba(0,0,0,1)');

    // 第二圈颜色
    gradient.addColorStop(0.5, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.55, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(0,0,0,1)');

    // 第二圈颜色
    gradient.addColorStop(0.9, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.95, 'rgba(255,255,255,1)');
    gradient.addColorStop(1.0, 'rgba(0,0,0,1)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;

  },

  /**
   * 动态
   */
  update: function(timer) {
    if (this.dynamicType === DYNAMICTYPE1) {
      this.mesh.scale.set(this.scale, this.scale, this.scale);
      this.scale += 0.01;
      if (this.scale >= 1.5) {
        this.scale = 1.0;
      }
    }
    if (this.dynamicType === DYNAMICTYPE2) {
      var scale = 0.8 + (Math.sin(timer * 5) + 1.0) / 4;
      this.mesh.scale.set(scale, scale, scale);
    }
  }
});

/**
 * 创建标签
 * @param scene
 * @param baseURL
 * @constructor
 */
PGL.Labels = function(scene, baseURL) {
  this.scene = scene;
  this.baseURL = baseURL;

  this.labels = [];
};

Object.assign(PGL.Labels.prototype, {
  /**
   * 创建颜色标签
   * @param data
   * @returns {Raycaster.params.Mesh|Raycaster.params.Mesh|Mesh|Raycaster.params.Mesh|Mesh}
   */
  createLabels: function(data) {

    for (var i = 0; i < data.length; i++) {
      var label = new PGL.Label(this.baseURL, data[i]);

      this.labels.push(label);
      this.scene.add(label.mesh);
    }
  },

  /**
   * 更新动态网格
   */
  update: function(timer) {

    for (var i = 0; i < this.labels.length; i++) {
      this.labels[i].update(timer);
    }
  },

  /**
   * 显示隐藏标签
   * @param visible
   */
  show: function(visible) {
    for (var i = 0; i < this.labels.length; i++) {
      this.labels[i].mesh.visible = visible;
    }
  }
});

/**
 * 模型标签
 * @param states 基础路径
 * @param options 参数
 * @constructor
 */
PGL.ModelLabel = function(states, options) {
  PGL.BaseLabel.call(this, states, options);

  // 保存模型对象
  this.model = null;
};
PGL.ModelLabel.prototype = Object.assign(Object.create(PGL.BaseLabel.prototype), {
  /**
   * 创建标签
   * @param options
   *  url:模型路径
   *  project：模型文件夹
   *  loadType: 模型类型
   *  name:模型名称
   *  materialName：材质名称
   * @param callback 回调函数
   */
  init: function(options, callback) {
    var _this = this;

    var loaders = new PGL.Loaders(this.states);
    loaders.load(options, function(obj) {
      _this.parse(obj, options);
      if (callback) callback(_this.model);
    });
  },

  /**
   * 设置模型
   * @param obj
   * @param options
   */
  parse: function(obj, options) {
    if (options.loadType === GLTF_TYPE) {
      this.model = obj.scene.getObjectByName("RootNode");
    } else if (options.loadType === MTL_OBJ_TYPE) {
      this.model = obj;
    }
    this.model.position.copy(this.pos);
  },

  /**
   * 释放内存
   */
  dispose: function() {
    var object3DExtension = new PGL.Object3DExtension();
    object3DExtension.dispose(this.model)
  }
});

/**
 * 管理以模型作为标签的标签
 * @param scene 场景
 * @param states 基础路径
 * @constructor
 */
PGL.ModelLabels = function(scene, states) {
  PGL.BaseLabels.call(this, scene, states);
};
PGL.ModelLabels.prototype = Object.assign(Object.create(PGL.BaseLabels.prototype), {
  /**
   * 添加标签
   * @param data
   */
  addLabel: function(data) {
    var _this = this;

    var params = {
      url: this.states.config.sourceURL + "/" + data.project + "/model/",
      name: data.name,
      materialName: data.materialName,
      loadType: data.loadType,
    };
    if (Array.isArray(data.pos)) {
      this._load(params, function(obj) {
        for (var i = 0; i < data.pos.length; i++) {
          var mesh = obj.children[0].clone();

          let param = {
            id: data.pos[i].id,
            pos: data.pos[i].pos,
            loadType: data.loadType,
            dynamicType: data.dynamicType || 0
          };
          var modelLabel = new PGL.ModelLabel(_this.states, param);
          modelLabel.parse(mesh, param);
          mesh.name = param.id;

          _this.scene.add(mesh);
          _this.labels.push(modelLabel);
        }
      });
    } else {
      var modelLabel = new PGL.ModelLabel(this.states, data);
      modelLabel.init(params, function(obj) {
        _this.scene.add(obj);
        _this.labels.push(modelLabel);

        if (data.callback) data.callback(obj);
      });
    }
  },

  /**
   * 加载模型
   * @param options
   * @param callback
   */
  _load: function(options, callback) {
    var loaders = new PGL.Loaders(this.states);
    loaders.load(options, function(obj) {
      if (callback) callback(obj);
    });
  }
});

/************************* 模型变换管理 ************************************************/
/**
 * 模型变换管理
 * @param states 状态机
 * @constructor
 */
PGL.Model = function(states) {
  this.states = states;

  // 模型动画
  this.gltf = null;
  // 设置当前加载模型
  this.model = null;

  // 动画
  this.mixer = null;
  this.actions = [];
};
Object.assign(PGL.Model.prototype, {

  /**
   * 修改模型
   * @param object 修改模型
   */
  updateModel: function(object) {

    this.dispose();

    if (object.constructor !== THREE.Group && object.constructor !== THREE.Object3D) {
      this.gltf = object;
      this.model = object.scene;
    } else {
      this.model = object;
    }

    // 更新模型属性
    this.updateModelAttribute();
  },

  updateModelAttribute: function() {
    var modelConfig = this.states.modelConfig;
    this.model.scale.set(modelConfig.scale, modelConfig.scale, modelConfig.scale);

    if (this.gltf && this.gltf.animations.length > 0) {
      if (modelConfig.animatePlay) {
        if (!this.mixer) {
          this.mixer = new THREE.AnimationMixer(this.model);
          for (var i = 0; i < this.gltf.animations.length; i++) {
            var clip = this.gltf.animations[i];
            var action = this.mixer.clipAction(clip);
            this.actions.push(action);
          }
        }
        this.playAllAnimation();
      } else {
        this.stopAnimation();
      }
    }
  },

  dispose: function() {
    if (this.mixer) {
      for (var i = 0; i < this.actions.length; i++) {
        this.mixer.uncacheClip(this.actions[i]);
      }
      this.actions = [];
      this.mixer.uncacheRoot(this.model);
      this.mixer = null;
    }
  },

  updateAnimation: function(timer) {
    if (this.mixer) {
      this.mixer.update(timer);
    }
  },

  playAllAnimation: function() {
    for (var i = 0; i < this.actions.length; i++) {
      this.actions[i].play();
    }
  },
  stopAnimation: function() {
    if (this.mixer) {
      this.mixer.stopAllAction();
    }
  }
});

/************************* 状态管理 ************************************************/
/**
 * 状态机
 * @constructor
 */
PGL.States = function() {

  // 场景配置
  this.config = {};
  // 模型修改配置
  this.modelConfig = {};
};
Object.assign(PGL.States.prototype, {
  /**
   * 初始化状态机
   * @param config 场景配置
   */
  init: function(config) {
    this.updateConfig(config);
  },
  /**
   * 跟新场景配置
   * @param config
   */
  updateConfig: function(config) {
    this.config = Object.deepMerge(defaultConfig, config);
  },
  updateSceneBackgroundConfig: function(background) {
    this.config.scene.background = Object.deepMerge(this.config.scene.background, background);
  },
  /**
   * 更新场景模型配置
   * @param modelDataConfig 模型配置
   */
  updateModelDataConfig: function(modelDataConfig) {
    this.config.modelData = Object.deepMerge(defaultConfig.modelData, modelDataConfig);
  },
  /**
   * 检查模型配置是否正确
   * @returns {boolean}
   */
  checkModelConfig: function() {
    return !!this.config.modelData.name;
  },

  /**
   * 更新模型修改配置
   * @param modelConfig
   */
  updateModelConfig: function(modelConfig) {
    debugger
    //深度合并两个或多个对象的可枚举属性。 Object.deepMerge
    this.modelConfig = Object.deepMerge(defaultModelConfig, modelConfig);
  },

  /**
   * 获取当前可以使用的材质名称
   */
  getTexturesNames: function() {
    if (!this.modelConfig.textures) {
      this.modelConfig.textures = [];
    }
    var textureNames = this.modelConfig.textures.concat();
    if (!textureNames) {
      textureNames = [];
    }
    return textureNames;
  },

  /**
   * 获取材质贴图名称
   */
  getMaterialMapName: function(name) {
    if (this.modelConfig.material[name] && this.modelConfig.material[name].mapName) {
      return this.modelConfig.material[name].mapName;
    } else {
      return "default";
    }
  },

  updateLabelData: function(data) {
    var labels = this.modelConfig.mesh.labels;
    for (var i = 0; i < labels.length; i++) {
      if (labels[i].name === data.name) {
        labels[i] = data;
        return;
      }
    }

    labels.push(data);
  },

  deleteLabel: function(name) {
    var labels = this.modelConfig.mesh.labels;
    for (var i = 0; i < labels.length; i++) {
      if (labels[i].name === name) {
        labels.splice(i, 1);
        return;
      }
    }
  }
});

/************************* 自定义函数执行 ******************************************/
/**
 * 自定义函数
 * @param scene3D
 * @param states
 * @constructor
 */
PGL.CustomFunction = function(states, scene3D) {
  this.states = states;
  this.scene3D = scene3D;
};
Object.assign(PGL.CustomFunction.prototype, {

  constructor: PGL.CustomFunction,

  /**
   * 给指定的mesh添加事件
   * @param meshName
   * @param funcName
   * @param options
   */
  addFunc: function(meshName, funcName, options) {
    var warps = this.states.modelConfig.mesh.funcData;
    warps[meshName] = warps[meshName] || [];

    for (var i = 0; i < warps[meshName].length; i++) {
      if (warps[meshName][i].name === funcName) {
        return false;
      }
    }

    warps[meshName].push({
      name: funcName,
      params: options
    });

    return true;
  },

  removeFunc: function(meshName, funcName) {
    var warps = this.states.modelConfig.mesh.funcData;
    if (warps[meshName]) {
      for (var i = 0; i < warps[meshName].length; i++) {
        if (warps[meshName][i].name === funcName) {
          warps[meshName].splice(i, 1)
        }
      }
    }
  },

  getFunc: function(meshName) {
    var warps = this.states.modelConfig.mesh.funcData;
    if (meshName === "" || meshName === null) {
      return [];
    }

    if (warps[meshName]) {
      return warps[meshName].slice();
    } else {
      return [];
    }
  },

  getALLFunc: function() {
    return Object.deepMerge({}, this.states.modelConfig.mesh.funcData);
  },

  renderFunc: function(object) {
    if (!object) {
      return;
    }

    var warps = this.states.modelConfig.mesh.funcData;
    let funcArray = warps[object.object.name] || [];

    for (var i = 0; i < funcArray.length; i++) {
      this[funcArray[i].name](object, funcArray[i].params);
    }
  }
});

let INSTANCE = PGL.CustomFunction.prototype;

export {INSTANCE};
export default PGL;
