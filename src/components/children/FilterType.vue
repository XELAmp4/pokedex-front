<template>
    <div>
        <button v-for="(type, index) in types" :key="index" :class="'btnFilterByType ' + type.toLowerCase()" :id="type.toLowerCase()" @click="toggleFilter(type.toLowerCase())">
            {{ type }}
        </button>
    </div>
</template>

<script>
    // Importer le fichier JSON
    import typesData from '/datas/types.json'; 

    export default {
        name: 'FilterType',
        data() {
            return {
                types: [], // Initialiser un tableau pour stocker les données JSON
                activeFilters: [] // Déclarer activeFilters comme une propriété de données
            };
        },
        created() {
            // Appeler une méthode pour récupérer les données JSON lorsque le composant est créé
            this.fetchData();
        },
        watch: {
            activeFilters: {
                handler: 'handleFilterChange', // nom de la fonction à exécuter
                deep: true // surveiller les changements profonds dans le tableau
            }
        },
        methods: {
            fetchData() {
                // Mettre à jour les données dans le tableau items avec les données importées du fichier JSON
                this.types = typesData; 
            },
            handleFilterChange() {
                this.filterByType(); 
                this.updateButton(); 
            },
            toggleFilter(type) {
                if (this.activeFilters.includes(type)) {
                    let index = this.activeFilters.indexOf(type);
                    this.activeFilters[index] = null;
                    this.activeFilters = this.activeFilters.filter(item => item !== null);
                } else if (this.activeFilters.length < 2) {
                    this.activeFilters.push(type);
                }
            },
            filterByType() {
                const pokemonCards = document.querySelectorAll('li.pokemonCard');
                if (this.activeFilters.length === 0) {
                    // Si ActiveFilters est vide, retirer la classe isFiltered de tous les éléments
                    pokemonCards.forEach(card => {
                        card.classList.remove('isFiltered');
                    });
                } else {
                    pokemonCards.forEach(card => {
                        const type1 = card.dataset.type1;
                        const type2 = card.dataset.type2;
                        const hasType1 = this.activeFilters.includes(type1);
                        const hasType2 = this.activeFilters.includes(type2);
                        if (this.activeFilters.length === 1) {
                            // Si ActiveFilters a une seule valeur
                            if (!(hasType1 || hasType2)) {
                                card.classList.add('isFiltered');
                            } else {
                                card.classList.remove('isFiltered');
                            }
                        } else if (this.activeFilters.length === 2) {
                            // Si ActiveFilters a deux valeurs
                            if (!(hasType1 && hasType2)) {
                                card.classList.add('isFiltered');
                            } else {
                                card.classList.remove('isFiltered');
                            }
                        }
                    });
                }
            },
            updateButton() {
                const activeFiltersIds = this.activeFilters.map(filter => filter.toLowerCase()); // Convertir les noms de filtre en minuscules
                const buttons = document.querySelectorAll('.btnFilterByType');
                let activeCount = 0; // Compter le nombre de boutons actifs
                buttons.forEach(button => {
                    const buttonId = button.id.toLowerCase();
                    if (activeFiltersIds.includes(buttonId)) {
                        button.classList.add('isActive');
                        activeCount++;
                    } else {
                        button.classList.remove('isActive');
                        button.classList.remove('isUnavailable'); // Retirer la classe isUnavailable si le bouton n'est pas actif
                    }
                });

                // Si deux boutons sont actifs, ajouter la classe isUnavailable aux boutons inactifs
                if (activeCount === 2) {
                    buttons.forEach(button => {
                        const buttonId = button.id.toLowerCase();
                        if (!activeFiltersIds.includes(buttonId)) {
                            button.classList.add('isUnavailable');
                        }
                    });
                }
            }

        }
    };
</script>


<style lang="sass" scoped>
@import '/src/styles/variables.sass'
.btnFilterByType
    padding: 5px 10px
    border-radius: 30px
    font-family: $ff1
    color: $light
    font-size: .7em
    border: none

    &:hover
        cursor: pointer

    &.isActive
        border: 2px yellow solid
        
    &.isUnavailable
        touch-action: none
        cursor: not-allowed
        filter: grayscale(1)

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