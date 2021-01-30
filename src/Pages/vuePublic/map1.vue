<template>
  <div class="FU">
    <div class="map">
      <baidu-map class="map" :center="center" :zoom="zoom">
        <!-- bm-marker标记 -->
        <bm-marker :position="points" :dragging="true" @mouseup="getPoints"></bm-marker>
        <!-- 大小缩放 BMAP_ANCHOR_TOP_RIGHT 定位到右上角 -->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      </baidu-map>

      <baidu-map class="map mapBom" :position="points" :center="center"  :scroll-wheel-zoom="true" :maxZoom="maxZoom" :minZoom="minZoom" @click="mapClick" @zoomend="zoomEnd" @ready="ready" mapType='BMAP_HYBRID_MAP'>
        <bm-control>
          <el-input placeholder="输入小区名称" v-model="queryStr" @keyup.enter.native="queryCellByName">
            <el-button :disabled="bntCellVisible!=1" slot="append" icon="el-icon-search" @click="queryCellByName"></el-button>
          </el-input>
        </bm-control>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      </baidu-map>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      childMsg: '',
      //中心点
      center: {
        lng: 116.404,
        lat: 39.915
      },
      // 坐标
      points: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 15,
      maxZoom: 18,
      minZoom: 5,
      bntCellVisible: 1,
      queryStr: ''
    }
  },
  methods: {
    //百度地图初始化事件
    ready({ BMap, map }) {
      this.Bmap = BMap
      this.map = map
    },
    //地图
    handler({
      BMap,
      map
    }) {
      console.log(BMap, map)
    },
    getPoints(e) {
      // this.model.CELL_LON = e.point.lng
      // this.model.CELL_LAT = e.point.lat
      console.log(e.point.lat);
      console.log(e.point.lng);
    },
    queryCellByName() {
      return ''
    },
    mapClick(event) { //地图点击事件
      console.log(`{"lng": ${event.point.lng}, "lat": ${event.point.lat}}`);
    },
    zoomEnd(event) { //缩放结束 用于缩小到一定比例后加载小区数据
    },
  },
}
</script>
<style scoped>
.mapBom {
  margin-top: 30px;
}
.map {
  width: 100%;
  height: 300px;
  background: #ccc;
}
</style>