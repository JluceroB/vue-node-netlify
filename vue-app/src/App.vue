<!-- test-vue-app/src/App.vue -->
<template>
  <div id="app">
    <SiteHeader />
    <router-view />
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader.vue';

export default {
  components: {
    SiteHeader
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
