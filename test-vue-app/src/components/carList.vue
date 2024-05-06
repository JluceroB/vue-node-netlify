<!-- CarList.vue -->
<template>
    <div>
      <h2>Car Inventory</h2>
      <ul>
        <li v-for="car in cars" :key="car.id">
          {{ car.year }} {{ car.make }} {{ car.model }} - {{ car.color }} ({{ car.mileage }} miles)
          <span v-if="car.available">(Available)</span>
          <span v-else>(Not Available)</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cars: []
      };
    },
    created() {
      fetch('/api')
        .then(response => response.json())
        .then(data => {
          this.cars = data;
        })
        .catch(err => {
          console.error('Error fetching car data:', err);
        });
    }
  };
  </script>
  
  <style scoped>
  h2 {
    color: #333;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
  </style>
  