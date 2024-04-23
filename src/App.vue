<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="sass">
@import '/src/styles/main.sass'

*
  padding: 0
  margin: 0
  box-sizing: border-box

body
  background: $gradient1
  background-size: 1000% 1000%
  animation: gradient 15s ease infinite

</style>
