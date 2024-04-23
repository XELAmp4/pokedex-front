<template>
 
 
<div class="header-container">
    <h1>Pokedex</h1>

    <FilterName/>
    <div>
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
import FilterName from './children/FilterName.vue'

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
        FilterType,
        FilterName
    }
    
};
</script>

<style lang="sass" scoped>
@import '/src/styles/main.sass'
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

</style>
