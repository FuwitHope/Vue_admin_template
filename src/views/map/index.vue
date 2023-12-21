<template>
  <div>
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Hello',
      message: 'Welcome to Vue!'
    }
  },
  methods: {
    changeMessage() {
      this.message = 'Thank you for using Vue!'
    }
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
