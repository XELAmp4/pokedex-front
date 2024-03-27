<template>
 
 
<div class="header-container">
    <h1>Pokedex</h1>

    <input class="searchBar" type="text" id="name" placeholder="Recherche par nom">
    <div>
        <input type="checkbox"/><label for="scales">Type 1</label>
        <input type="checkbox"/><label for="scales">Type 2</label>
    </div>
</div> 

<ul class="listingPokemon">
    <PokemonCard
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :type="item.types"
        :img="item.imgUrl"
        :pokedexNumber="item.regions.regionPokedexNumber"
    />
</ul>



</template>

<script>
//Import des composants enfants

import PokemonCard from './children/PokemonCard.vue'

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
        PokemonCard
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.listingPokemon
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 10px
    justify-content: center

.header-container
    display: block
    margin: auto
    width: fit-content
    text-align: center
    margin-bottom: 10px

    .searchBar
        width: 30vw
        height: 40px
        padding: 5px
        border: none
        border-radius: 5px
        text-align: center
</style>
