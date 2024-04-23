<template>
    <div v-if="showOverlay" class="overlay">
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
      }, 3500);
    },
    components: {
        OverlayLogo
    }
  };
</script>
  
<style lang="sass">
@import '/src/styles/variables.sass'
@import '/src/styles/animations.sass'

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


    &-content 
        width: 30vw

    &-logo
        overflow: visible
        stroke: #00f2fe
        stroke-
        stroke-width: 5px
        stroke-dasharray: 2670
        stroke-dashoffset: 2670
        animation: draw 2s linear forwards, desappear 1s linear forwards 2s

        path.isInvisible
            fill: transparent
        
        path.isMain
            opacity: 0
            animation: appear 1s linear forwards 2s


</style>
  