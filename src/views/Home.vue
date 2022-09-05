<template>
<div>
  Home
  <div>count: {{ count }}</div>
  <button @click="addCount">+1</button>
</div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    count () {
      return this.$store.getters.count
    }
  },
  methods: {
    addCount () {
      this.$store.commit('addCount', 1)
    }
  }
}
</script>

<style scoped>

</style>
