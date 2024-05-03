<template>
    <input class="searchBar" type="text" id="name" placeholder="Find by name" @input="filterByName">
</template>

<script>

    export default {
        name: 'FilterName',
        data() {
            return {
            };
        },
        props: {
            target: String
        },
        methods: {
            filterByName(e) {
                const pokemonCards = document.querySelectorAll('li.pokemonCard');
                pokemonCards.forEach(card => {
                    const nameElement = card.querySelector(this.target);
                    const name = nameElement.textContent.toLowerCase();
                    let searchContent = e.target.value.toLowerCase();
                    if (name.search(searchContent) == -1) {
                        card.classList.add('isFilteredByName');
                    }else{
                        card.classList.remove('isFilteredByName');
                    }
                });
            }
        }
    };
</script>


<style lang="sass" scoped>
@import '/src/styles/main.sass'
.searchBar
    display: inline-block
    width: 30vw
    min-width: 300px
    height: 40px
    padding: 5px
    border: 2px solid grey
    border-radius: 5px
    text-align: center
    margin: 0 5px
</style>