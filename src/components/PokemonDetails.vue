<template>
    <router-link id="homeBtn" to="/home">HOME</router-link>
    <div  :class="'container ' + pokemon.types[0].toLowerCase() ">
        <div class="media">
            <img :src="pokemon.imgUrl" :alt="pokemon.name">
        </div>

        <div class="content">
            <h1>{{ pokemon.name }}</h1>
        
            <div>
                <p v-if="pokemon.types.length === 2">
                    Types : {{ pokemon.types[0] }} / {{ pokemon.types[1] }}
                </p>
                <p v-else>Type : {{ pokemon.types[0] }}</p>  
                
                <p>{{ pokemon.description }}</p>
                <button @click="() => readTxt(pokemon.description)">Lire la description</button>
            </div>
        </div>
        
    </div>
  </template>
  
<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  methods: {
    readTxt(texte) {
        let syntheseVocale = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance(texte);
        syntheseVocale.speak(utterance);
    }
  }
};
</script>

  
<style lang="sass" scoped>
@import '/src/styles/main.sass'
.container
    display: flex
    flex-wrap: wrap
    width: 100%
    height: 100%

.media
    flex: 1 1 50%

    img
        width: 100%
        height: auto

.content
    flex: 1 1 50%

#homeBtn
    position: absolute
    top: 0
    left: 0
    background-color: palevioletred
    text-decoration: none
    color: white
    font-weight: bold
    padding: 5px
    font-family: sans-serif




// Gestion des types, ne pas écrire après cette ligne pour ne pas perdre de lisibilité
.container
    &.bug
        background: $bug-gradient

    &.dark
        background: $dark-gradient

    &.dragon
        background: $dragon-gradient

    &.electric
        background: $electric-gradient

    &.fairy
        background: $fairy-gradient

    &.fighting
        background: $fighting-gradient

    &.fire
        background: $fire-gradient

    &.flying
        background: $flying-gradient

    &.ghost
        background: $ghost-gradient

    &.normal
        background: $normal-gradient

    &.grass
        background: $grass-gradient

    &.ground
        background: $ground-gradient

    &.ice
        background: $ice-gradient

    &.poison
        background: $poison-gradient

    &.psychic
        background: $psychic-gradient

    &.rock
        background: $rock-gradient

    &.steel
        background: $steel-gradient

    &.water
        background: $water-gradient


  
</style>
  