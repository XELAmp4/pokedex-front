<template>
    <li :class="'pokemonCard ' + type[0].toLowerCase() ">
        <router-link class="linkCard" :to="'/pokemon/' + name">
            <p>{{ name }}</p>
            <p>{{ type[0] }}</p>
            <img :src="img" :alt="name">
            <p>{{ pokedexNumber }}</p>
        </router-link> 
    </li>
  </template>
  
  <script>
  export default {
    name: 'PokemonCard',
    props: {
      name: String,
      type: Array,
      img: String,
      pokedexNumber: Number
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '/src/styles/variables.sass'
.pokemonCard
    background-color: $col1
    padding: 10px
    width: fit-content
    list-style: none
  

    img
        width: 200px

    &.bug
        background-color: $bug

    &.dark
        background-color: $dark

    &.dragon
        background-color: $dragon

    &.electric
        background-color: $electric

    &.fairy
        background-color: $fairy

    &.fighting
        background-color: $fighting

    &.fire
        background-color: $fire

    &.flying
        background-color: $flying

    &.ghost
        background-color: $ghost

    &.normal
        background-color: $normal

    &.grass
        background-color: $grass

    &.ground
        background-color: $ground

    &.ice
        background-color: $ice

    &.poison
        background-color: $poison

    &.psychic
        background-color: $psychic

    &.rock
        background-color: $rock

    &.steel
        background-color: $steel

    &.water
        background-color: $water
  

.linkCard
    text-decoration: none
    color: black

</style>
  