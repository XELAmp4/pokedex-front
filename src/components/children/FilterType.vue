<template>
    <div>
      <button v-for="(type, index) in types" :key="index" @click="filterByType(type)">
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
        types: [] // Initialiser un tableau pour stocker les données JSON
      };
    },
    created() {
      // Appeler une méthode pour récupérer les données JSON lorsque le composant est créé
      this.fetchData();
    },
    methods: {
      fetchData() {
        // Mettre à jour les données dans le tableau items avec les données importées du fichier JSON
        this.types = typesData; 
      },
      filterByType(type) {
        const pokemonCards = document.querySelectorAll('li.pokemonCard');
        pokemonCards.forEach(card => {
        const type1 = card.dataset.type1;
        const type2 = card.dataset.type2;
        if (type1 !== type.toLowerCase() && type2 !== type.toLowerCase()) {
          card.classList.add('isFiltered');
        } else {
          card.classList.remove('isFiltered');
        }
      });
      }
    }
  };
  </script>
  