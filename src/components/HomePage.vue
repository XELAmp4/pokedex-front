<template>
 
 
<div class="header-container">
    <h1>Pokedex</h1>

    <FilterName target=".pokemonCard-name"/>
    <FilterNumber target=".pokemonCard-number"/>
    
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
import FilterNumber from './children/FilterNumber.vue'

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
    mounted() {
        document.title = 'Pokedex';
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
        FilterName,
        FilterNumber
    }
    
};
</script>

<style lang="sass" scoped>
@import '/src/styles/main.sass'

h1
    font-family: sans-serif
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
