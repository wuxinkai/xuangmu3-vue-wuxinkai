<template>
  <div>
  <cascade-loop :list="list" :cur-width="400" :all-width="800" :all-height="300":cur-height="280" :scale="0.8"></cascade-loop>
  </div>
</template>

<script>
import cascadeLoop from "./cascadeLoop2.vue";
export default {
  components: {
    cascadeLoop
  },
  name: "vueBanner",
  data() {
    return {
      list: [
        { content: 1, color: 'red' },
        { content: 2, color: 'green' },
        { content: 3, color: 'blue' },
        { content: 4, color: '#66CC66' },
        { content: 5, color: 'black' },
        { content: 6, color: 'blue' }
      ]
    }
  },
  methods: {

  },
}
</script>

