<!-- test-vue-app/src/components/Header.vue -->
<template>
    <header>
      <h1>Car Inventory</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><router-link to="/inventory">Car Inventory</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    text-align: center;
  }
  nav ul {
    list-style: none;
    padding: 0;
  }
  nav ul li {
    display: inline;
    margin: 0 15px;
  }
  nav ul li a {
    color: #fff;
    text-decoration: none;
  }
  </style>
  