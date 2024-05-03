<template>
    <select class="searchBarState" @change="filterByState">
      <option value="all">All</option>
      <option value="seen">Seen</option>
      <option value="catch">Catch</option>
    </select>
  </template>
  
  <script>
  export default {
    name: 'FilterState',
    props: {
      target: String
    },
    methods: {
      filterByState(e) {
        const pokemonCards = document.querySelectorAll('li.pokemonCard');
        const selectedValue = e.target.value;
  
        pokemonCards.forEach(card => {
          const isSeen = card.getAttribute('data-seen') === 'true';
          const isCaught = card.getAttribute('data-catch') === 'true';
  
          if (selectedValue === 'all') {
            card.classList.remove('isFilteredByState');
          } else if (selectedValue === 'seen') {
            if (isSeen) {
              card.classList.remove('isFilteredByState');
            } else {
              card.classList.add('isFilteredByState');
            }
          } else if (selectedValue === 'catch') {
            if (isCaught) {
              card.classList.remove('isFilteredByState');
            } else {
              card.classList.add('isFilteredByState');
            }
          }
        });
      }
    }
  };
  </script>
  
  <style lang="sass" scoped>
  @import '/src/styles/main.sass'
  .searchBarState
    display: inline-block
    height: 40px
    padding: 5px
    border: 2px solid grey
    border-radius: 5px
    text-align: center
    margin: 0 5px
  </style>
  