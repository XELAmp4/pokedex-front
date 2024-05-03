<template>
    <input class="searchBarNumber" type="number" id="name" placeholder="Find by number" min="1" @input="filterByNumber">
</template>

<script>

    export default {
        name: 'FilterNumber',
        data() {
            return {
            };
        },
        props: {
            target: String
        },
        methods: {
            filterByNumber(e) {
                const pokemonCards = document.querySelectorAll('li.pokemonCard');
                pokemonCards.forEach(card => {
                    const nameElement = card.querySelector(this.target);
                    const name = nameElement.textContent.toLowerCase();
                    let searchContent = e.target.value.toLowerCase();
                    if (name.search(searchContent) == -1) {
                        card.classList.add('isFilteredByNumber');
                    }else{
                        card.classList.remove('isFilteredByNumber');
                    }
                });
            }
        }
    };
</script>


<style lang="sass" scoped>
@import '/src/styles/main.sass'
.searchBarNumber
    display: inline-block
    width: 10vw
    min-width: 100px
    height: 40px
    padding: 5px
    border: 2px solid grey
    border-radius: 5px
    text-align: center
    margin: 0 5px
</style>