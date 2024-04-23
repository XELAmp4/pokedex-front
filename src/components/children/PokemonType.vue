<template>
    <span :class="'typeChips ' +  type.toLowerCase()" >{{ type}}</span>
</template>
      
<script>
export default {
    name: 'PokemonType',
    props: {
      type: String
    }
  }
</script>
    
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '/src/styles/main.sass'

.typeChips
    padding: 5px 10px
    border-radius: 30px
    font-family: $ff1
    font-size: .7em
    // Gestion des types, ne pas écrire après cette ligne pour ne pas perdre de lisibilité
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
</style>