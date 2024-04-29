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
  background: url($bg-url) repeat 0 0
  animation:  bg-scrolling 2.5s linear infinite

  &.menu-open
    overflow: hidden

::-webkit-scrollbar 
  width: 7px
  height: 7px

::-webkit-scrollbar-button 
  width: 0px
  height: 0px

::-webkit-scrollbar-thumb 
  background: #4de1ff
  border: 0px none #ffffff
  border-radius: 50px

::-webkit-scrollbar-thumb:hover 
  background: #51b0c8

::-webkit-scrollbar-thumb:active 
  background: #477d90

::-webkit-scrollbar-track 
  background: #ffffff
  border: 0px none #ffffff
  border-radius: 48px

::-webkit-scrollbar-track:hover 
  background: #cfcfcf

::-webkit-scrollbar-track:active 
  background: #949494

::-webkit-scrollbar-corner 
  background: transparent

</style>
