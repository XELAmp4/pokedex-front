<template>
    <div>
        <input class="searchBar" type="text" id="name" placeholder="Find by name" @input="filterByName">
    </div>
</template>

<script>

    export default {
        name: 'FilterName',
        data() {
            return {
            };
        },
        created() {
        },
        watch: {

        },
        methods: {
            filterByName(e) {
                const pokemonCards = document.querySelectorAll('li.pokemonCard');
                pokemonCards.forEach(card => {
                    const nameElement = card.querySelector('.pokemonCard-name');
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
    width: 30vw
    height: 40px
    padding: 5px
    border: none
    border-radius: 5px
    text-align: center
</style>