<!-- src/components/HelloWorld.vue -->
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello from the Vue.js Application!",
    };
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
