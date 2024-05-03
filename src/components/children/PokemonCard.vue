<template>
    <li :class="'pokemonCard ' + types[0].toLowerCase() " 
        :data-type1="types[0].toLowerCase()" 
        :data-type2="types[1] ? types[1].toLowerCase() : ''"
        :data-seen="isPokemonSeen"
        :data-catch="isPokemonCaught"
        >
        <router-link class="pokemonCard-link" :to="'/pokemon/' + name">
            <div class="pokemonCard-content">
                <p class="pokemonCard-number">{{ formatingNumber(pokedexNumber) }}</p>
                <p class="pokemonCard-name">{{ name }}</p>
                
                <div class="pokemonCard-typeContainer">
                    <PokemonType
                        v-for="(type, index) in types"
                        :key="index"
                        :type="type"
                    />
                </div>
            </div>
            <img :src="img" :alt="name" class="pokemonCard-image">
            <span class="pictoState" v-if="isPokemonCaught"><PictoCatch/></span>
            <span class="pictoState" v-else-if="isPokemonSeen"><PictoSeen/></span>
        </router-link> 
        <WatermarkPokeball/>
    </li>
</template>
  
<script>
import WatermarkPokeball from './WatermarkPokeball.vue';
import PokemonType from './PokemonType.vue';
import PictoSeen from './PictoSeen.vue'
import PictoCatch from './PictoCatch.vue'

  export default {
    name: 'PokemonCard',
    props: {
      name: String,
      types: Array,
      img: String,
      pokedexNumber: Number,
      idBDD: Number
    },
    components: {
        WatermarkPokeball,
        PokemonType,
        PictoSeen,
        PictoCatch
    },
  data() {
    return {
      isPokemonSeen: false,
      isPokemonCaught: false
    };
  },
    methods: {
        formatingNumber(number) {
            let formatedNumber = "#";
            if (number < 10) {
                formatedNumber += "00" + number.toString()
            }else if (number < 100){
                formatedNumber += "0" + number.toString()
            }else{
                formatedNumber += number.toString()
            }
            return formatedNumber
        }
  },
  mounted() {
    // Récupérer l'utilisateur actif du local storage
    const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
    if (!activeUser || !activeUser.id) {
      console.error('No active user found.');
      return;
    }

    // Récupérer les données des utilisateurs du local storage
    const usersData = JSON.parse(localStorage.getItem('users'));
    if (!usersData || !Array.isArray(usersData)) {
      console.error('No user data found.');
      return;
    }

    // Trouver l'objet utilisateur correspondant à l'utilisateur actif
    const activeUserData = usersData.find(user => user._id === activeUser.id);
    if (!activeUserData) {
      console.error('Active user data not found.');
      return;
    }

    // Vérifier si le Pokémon est déjà vu
    this.isPokemonSeen = activeUserData.pkmnSeen.includes(this.idBDD);

    // Vérifier si le Pokémon est déjà attrapé
    this.isPokemonCaught = activeUserData.pkmnCatch.includes(this.idBDD);

  }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '/src/styles/main.sass'
.pokemonCard
    background-color: $col1
    width: 400px
    height: 150px
    list-style: none
    border-radius: 30px
    font-family: $ff1
    position: relative
    overflow: hidden
    box-shadow: #00000036 inset 0px -15px 10px 2px
    transition: box-shadow 1.5s

    .pictoState
        position: absolute
        top: 10px
        right: 10px
        svg
            width: 20px

    &-link
        text-decoration: none
        color: $light
        display: flex
        flex-direction: row
        position: relative
        z-index: 1
        width: 100%
        height: 100%
        justify-content: space-between


    &-content
        display: flex
        flex-direction: column
        justify-content: space-between
        padding: $spacing-small
            right: $spacing-medium

    &-image
        position: absolute
        top: 0
        right: 70px
        width: auto
        height: 95%
        transform-origin: center
        transition: transform .8s
        
    &-name
        font-weight: bold
        font-size: 1.5em
        margin-top: $spacing-xsmall
        letter-spacing: 1px
        display: inline-block
    
    &-number
        font-weight: bold
        font-size: 1em

    &-type
        &Container
            display: flex
            gap: 5px
            background-color: rgba($light, .5)
            margin-left: -$spacing-small
            border-radius: 0 5px 5px 0
            padding: 5px $spacing-small
            width: fit-content

    &-watermark
        position: absolute
        top: 0
        right: 0
        height: 100%
        width: auto
        z-index: 0
        opacity: .5

    &.isFilteredByType,
    &.isFilteredByName,
    &.isFilteredByNumber,
    &.isFilteredByState
        display: none


    // Effet de survol
    &:hover
        .pokemonCard
            &-watermark
                animation: shake 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite
            &-image
                transform: scale(.9)

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
  