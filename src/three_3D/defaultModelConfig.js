export var INPUT_COLOR_TYPE = 1;
export var INPUT_BOOLEAN_TYPE = 2;
export var INPUT_FLOAT_TYPE = 3;

export default {
  "scale": 1.0, // 模型缩放
  "animatePlay": true, // 是否播放动画
  "map": {},
  "textures": [],
  "material": {},
  "mesh": {
    "funcList": {
      "changeMeshMaterial": {
        "name": "changeMeshMaterial",
        "params": [
          {
            "name": "level",
            "levels": [
              {
                "name": "level0",
                "value": 0
              },
              {
                "name": "level1",
                "value": 1
              },
              {
                "name": "level2",
                "value": 2
              }
            ],
            "type": 1,
            "value": 0
          },
          {
            "name": "color",
            "type": 2,
            "value": "#00ff00"
          },
          {
            "name": "transparent",
            "type": 3,
            "value": false
          },
          {
            "name": "opacity",
            "type": 4,
            "value": 1.0,
            "max": 1.0,
            "min": 0.0,
            "step": 0.1
          }
        ]
      }
    },
    "funcData": {},// {name[]}
    "labels": [
      // {
      //   name: "HF_28_Material_#21954_0",
      //   className: "labelItem01",
      //   pos: "0,0,0",
      //   title: "输入蒸汽温度bak（c）",
      //   content: "177.07",
      //   show: false
      // }
    ], // 标签数据
  },
}