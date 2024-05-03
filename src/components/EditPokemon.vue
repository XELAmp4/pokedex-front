<template>
    <BurgerMenu/>
    <div class="formContainer">
      <h1>Edit Pokemon ({{ pokemon.name }})</h1>
      <form @submit.prevent="editPokemon">
        <div class="inputContainer">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" :placeholder="pokemon.name" required>
        </div>
        <div class="inputContainer">
          <label for="type1">Type 1:</label>
          <select v-model="selectedType1" id="type1" required>
            <option disabled value="">Please select a type</option>
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="inputContainer">
          <label for="type2">Type 2:</label>
          <select v-model="selectedType2" id="type2">
            <option value="">None</option>
            <option v-for="type in availableTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="inputContainer">
          <label for="description">Description:</label>
          <textarea id="description" v-model="description" :placeholder="pokemon.description" required></textarea>
        </div>
        <div class="inputContainer">
          <label for="regions">Regions:</label>
          <input type="text" id="regions" v-model="regions" :placeholder="formatRegions(pokemon.regions)" required>
          <p v-if="regionError" class="error-message">Please enter regions in the correct format (e.g., Kanto:25, Johto:25)</p>
        </div>
        <div class="inputContainer">
          <label for="imgUrl">Image URL:</label>
          <input type="text" id="imgUrl" v-model="imgUrl" :placeholder="pokemon.imgUrl" required>
        </div>
        <button type="submit">Edit Pokemon</button>
      </form>
      <p v-if="editError" class="error-message">Error during editing the Pokemon</p>
    </div>
  </template>
  
  <script>
  import BurgerMenu from './children/BurgerMenu.vue';
  
  export default {
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        name: '',
        selectedType1: '',
        selectedType2: '',
        description: '',
        regions: '',
        imgUrl: '',
        editError: false,
        regionError: false,
        types: JSON.parse(localStorage.getItem('types')) || [] // Récupérer les types depuis le localStorage
      };
    },
    computed: {
      availableTypes() {
        // Retourner les types qui n'ont pas encore été sélectionnés comme type 1
        return this.types.filter(type => type !== this.selectedType1);
      }
    },
    components:{
      BurgerMenu
    },
    mounted() {
      // Pré-remplir les champs du formulaire avec les données du Pokémon sélectionné
      this.name = this.pokemon.name;
      this.selectedType1 = this.pokemon.types[0];
      this.selectedType2 = this.pokemon.types[1] || '';
      this.description = this.pokemon.description;
      this.regions = this.formatRegions(this.pokemon.regions);
      this.imgUrl = this.pokemon.imgUrl;
    },
    methods: {
        editPokemon() {
            // Vérifier le contenu de la région
            if (!this.validateRegions()) {
                this.regionError = true;
                return;
            } else {
                this.regionError = false;
            }

            // Copier le Pokemon avant de le modifier
            const editedPokemon = JSON.parse(JSON.stringify(this.pokemon));

            // Modifier les données du Pokémon copié avec les nouvelles valeurs du formulaire
            editedPokemon.name = this.name;
            editedPokemon.types = [this.selectedType1.toUpperCase()];
            if (this.selectedType2) {
                editedPokemon.types.push(this.selectedType2.toUpperCase());
            }
            editedPokemon.description = this.description;
            editedPokemon.regions = this.parseRegions(this.regions);
            editedPokemon.imgUrl = this.imgUrl;

            // Récupérer tous les Pokémon depuis le localStorage
            const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
            // Trouver l'index du Pokémon sélectionné dans le tableau des Pokémon
            const index = pokemons.findIndex(pokemon => pokemon._id === this.pokemon._id);
            // Remplacer le Pokémon sélectionné avec ses données modifiées dans le tableau des Pokémon
            pokemons.splice(index, 1, editedPokemon);
            // Mettre à jour les données dans le localStorage
            localStorage.setItem('pokemons', JSON.stringify(pokemons));

            // Redirection vers une page appropriée (peut-être la liste des Pokémon)
            this.$router.push({ name: 'Home' });
            },
      formatRegions(regions) {
        // Formater les régions pour les afficher dans le champ de saisie
        return regions.map(region => `${region.regionName}:${region.regionPokedexNumber}`).join(', ');
      },
      parseRegions(regionsString) {
        // Séparer la chaîne en régions individuelles
        const regionsArray = regionsString.split(',');
        // Convertir chaque région en objet avec le nom et le numéro du Pokédex
        return regionsArray.map(region => {
          const [regionName, regionPokedexNumber] = region.trim().split(':');
          return { regionName: regionName.trim().charAt(0).toUpperCase() + regionName.trim().slice(1).toLowerCase(), regionPokedexNumber: parseInt(regionPokedexNumber.trim()) };
        });
      },
      validateRegions() {
        // Vérifier si chaque région est dans le format correct (nom:numéro)
        const regionsArray = this.regions.split(',');
        for (let region of regionsArray) {
          const [regionName, regionPokedexNumber] = region.trim().split(':');
          if (!regionName || !regionPokedexNumber || isNaN(parseInt(regionPokedexNumber))) {
            return false;
          }
        }
        return true;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour le formulaire */
  .formContainer {
    width: 50%;
    min-width: 300px;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .inputContainer {
    margin-bottom: 15px;
    width: 100%;
  }
  
  input[type="text"], input[type="password"], textarea {
    width: calc(100% - 10px);
    max-width: calc(100% - 10px);
    min-width: calc(100% - 10px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    transition: border-color 0.3s ease;
  }
  
  input[type="text"]:focus, input[type="password"]:focus, textarea:focus {
    border-color: #42b883;
  }
  
  button {
    width: 100%;
    padding: 12px 20px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
    letter-spacing: 1px;
    margin: 8px 0;
    border: none;
    border-radius: 5px;
    background-color: #42b883;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: darken(#42b883, 10%);
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    transition: opacity 0.3s ease;
  }
  
  .error-message.show {
    opacity: 1;
  }
  
  /* Styles pour les listes déroulantes */
  select {
    width: calc(100% - 10px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    transition: border-color 0.3s ease;
  }
  
  select:focus {
    border-color: #42b883;
  }
  
  </style>
  