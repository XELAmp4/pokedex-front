<template>
  <div :class="{ 'overlay': true, 'hide-overlay': !showOverlay }">
    <!-- Contenu de l'overlay ici -->
    <div class="overlay-content">
      <!-- Vous pouvez ajouter un spinner ou un message de chargement ici -->
      <OverlayLogo/>
    </div>
  </div>
</template>

<script>
import OverlayLogo from './OverlayLogo.vue';
export default {
  data() {
    return {
      showOverlay: true
    };
  },
  mounted() {
    // Cacher l'overlay après 3 secondes
    setTimeout(() => {
      this.showOverlay = false;
    }, 4000);
  },
  components: {
    OverlayLogo
  }
};
</script>

<style lang="sass">
@import '/src/styles/main.sass'

.overlay 
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: white 
  z-index: 999
  display: flex
  justify-content: center
  align-items: center
  opacity: 1
  transition: transform 1s ease

.overlay-content 
  width: 30vw

.overlay-logo
  overflow: visible
  stroke: #00f2fe
  stroke-width: 5px
  stroke-dasharray: 2670
  stroke-dashoffset: 2670
  animation: draw 2s linear forwards, desappear 1s linear forwards 2s

  path.isInvisible
    fill: transparent
    
  path.isMain
    opacity: 0
    animation: appear 1s linear forwards 2s

.hide-overlay
  transform: translateY(-100%)
</style>
