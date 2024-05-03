<template>
<BurgerMenu/>
<div class="header-container">
    <h1>Pokedex</h1>

    <FilterName target=".pokemonCard-name"/>
    <FilterNumber target=".pokemonCard-number"/>
    <FilterState/>
    
    <FilterType/>
</div> 

<ul class="listingPokemon">
    <PokemonCard
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :types="item.types"
        :img="item.imgUrl"
        :pokedexNumber="item.regions[0].regionPokedexNumber"
        :idBDD="item._id"
    />
</ul>



</template>

<script>
import PokemonCard from './children/PokemonCard.vue'
import FilterType from './children/FilterType.vue'
import FilterName from './children/FilterName.vue'
import FilterNumber from './children/FilterNumber.vue'
import FilterState from './children/FilterState.vue'
import BurgerMenu from './children/BurgerMenu.vue'


export default {
    data() {
        return {
            items: [] // Initialiser un tableau pour stocker les données JSON
        };
    },
    created() {
        // Appeler une méthode pour récupérer les données JSON lorsque le composant est créé
        this.fetchDataFromLocalStorage();
    },
    mounted() {
        document.title = 'Pokedex';
    },
    methods: {
        fetchDataFromLocalStorage() {
            // Récupérer les données depuis le local storage
            const storedData = localStorage.getItem('pokemons');
            
            // Vérifier si des données sont présentes dans le local storage
            if (storedData) {
                // Mettre à jour les données dans le tableau items avec les données du local storage
                this.items = JSON.parse(storedData); 
            } else {
                console.error('Aucune donnée de pokemon trouvée dans le local storage.');
            }
        }
    },
    components: {
        PokemonCard,
        FilterType,
        FilterName,
        FilterState,
        FilterNumber,
        BurgerMenu
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
