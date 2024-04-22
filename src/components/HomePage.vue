<template>
 
 
<div class="header-container">
    <h1>Pokedex</h1>

    <input class="searchBar" type="text" id="name" placeholder="Find by name">
    <div>
        <input type="checkbox"/><label for="scales">Type 1</label>
        <input type="checkbox"/><label for="scales">Type 2</label>
        <FilterType/>
    </div>
</div> 

<ul class="listingPokemon">
    <PokemonCard
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :types="item.types"
        :img="item.imgUrl"
        :pokedexNumber="item.regions[0].regionPokedexNumber"
    />
</ul>



</template>

<script>
//Import des composants enfants
import PokemonCard from './children/PokemonCard.vue'
import FilterType from './children/FilterType.vue'

// Importer le fichier JSON
import pokemonData from '/datas/pokemon.json'; 

export default {
    data() {
    return {
        items: [] // Initialiser un tableau pour stocker les données JSON
    };
    },
    created() {
        // Appeler une méthode pour récupérer les données JSON lorsque le composant est créé
        this.fetchData();
    },
    methods: {
    fetchData() {
        // Mettre à jour les données dans le tableau items avec les données importées du fichier JSON
        this.items = pokemonData; 
    }
    },
    components: {
        PokemonCard,
        FilterType
    }
    
};
</script>

<style lang="sass" scoped>
@import '/src/styles/variables.sass'
.listingPokemon
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: $spacing-xsmall
    justify-content: center

.header-container
    display: block
    margin: auto
    width: fit-content
    text-align: center
    margin-bottom: $spacing-xsmall

    .searchBar
        width: 30vw
        height: 40px
        padding: 5px
        border: none
        border-radius: 5px
        text-align: center
</style>
