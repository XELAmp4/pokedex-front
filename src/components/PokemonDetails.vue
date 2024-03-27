<template>
    <router-link id="homeBtn" to="/home">HOME</router-link>
    <div class="container">
        <div class="media">
            <img :src="pokemon.imgUrl" :alt="pokemon.name">
        </div>

        <div class="content">
            <h1>{{ pokemon.name }}</h1>
        
            <div>
                <p v-if="pokemon.types.length === 2">
                    Types : {{ pokemon.types[0] }} / {{ pokemon.types[1] }}
                </p>
                <p v-else>Type : {{ pokemon.types[0] }}</p>  
                
                <p>{{ pokemon.description }}</p>
                <button>Lire la description</button>
            </div>
        </div>
        
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style lang="sass" scoped>
  .container
    display: flex
  
  .media
    flex: 1 1 50%
  
  .content
    flex: 1 1 50%
  
  #homeBtn
    position: absolute
    top: 0
    left: 0
    background-color: palevioletred
    text-decoration: none
    color: white
    font-weight: bold
    padding: 5px
    font-family: sans-serif
  
  </style>
  