 <template>
  <div>
    <h2>通过插槽传给父页面值，</h2>
    <slot :data="dData">
      <!-- <ul>
        <li v-for="item in dData">{{item}}</li>
      </ul> -->
    </slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: 1,
      dData: ['奔驰', '保密', '捷达', '大众', '尼桑', '卡迪拉克']
    }
  },
  methods: {
    fn() {
      alert('父组件')
    }
  },

}
</script>
