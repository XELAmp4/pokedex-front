<template>
    <router-link id="homeBtn" to="/home">HOME</router-link>
    <div  :class="'container ' + pokemon.types[0].toLowerCase() ">
        <div class="media">
            <div class="media-inner">
                <img :src="pokemon.imgUrl" :alt="pokemon.name">
            </div>
            <div>
                <div>
                    <span>Mark as seen</span>
                    <input v-model="isPokemonSeen" type="checkbox" :disabled="isPokemonCaught" @click="toggleSeen">
                </div>
                <div>
                    <span>Mark as catch</span>
                    <input v-model="isPokemonCaught" type="checkbox" @click="toggleCatch">
                </div>
            </div>
        </div>

        <div class="content">
            <table class="content-table">
                <tr>
                    <td colspan="3" style="text-align: center;" class="content-title">{{ pokemon.name }}</td>
                </tr>
                <tr class="separator"></tr>
                <tr class="content-line aloneRow">
                    <td class="content-label" colspan="2" style="width: 66.66%;"><span>Types</span></td>
                    <td class="content-data" style="width: 33.33%;">
                        <div class="chipsContainer">
                            <PokemonType
                                v-for="(type, index) in pokemon.types"
                                :key="index"
                                :type="type"
                            />
                        </div>
                    </td>
                </tr>
                <tr class="separator"></tr>
                <tr class="content-line firstRow oneColumn">
                    <td class="content-label" colspan="3" style="width: 100%;"><span>Regions</span></td>
                </tr>

                <tr v-for="(region, index) in pokemon.regions" :key="index" :class="['content-line', index === pokemon.regions.length - 1 ? 'lastRow' : '']">
                    <td class="content-label" colspan="2" style="width: 50%;"><span>{{ region.regionName }}</span></td>
                    <td class="content-number" style="width: 50%;"><span>{{ '#' + region.regionPokedexNumber }}</span></td>
                </tr>

                <tr class="separator"></tr>
                <tr class="content-line firstRow oneColumn">
                    <td class="content-label" colspan="3" style="width: 100%;"><span>Description</span></td>
                </tr>
                <tr class="content-line lastRow">
                    <td colspan="3" style="width: 100%;">{{ pokemon.description }}</td>
                </tr>
            </table>
        </div>
        
    </div>
  </template>
  
  <script>
  import PokemonType from './children/PokemonType.vue'
  
  export default {
      props: {
          pokemon: {
              type: Object,
              required: true
          }
      },
      data() {
          return {
              isPokemonSeen: false,
              isPokemonCaught: false
          };
      },
      methods: {
          toggleSeen() {
              const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
              if (!activeUser || !activeUser.id) {
                  console.error('No active user found.');
                  return;
              }
  
              const usersData = JSON.parse(localStorage.getItem('users'));
              if (!usersData || !Array.isArray(usersData)) {
                  console.error('No user data found.');
                  return;
              }
  
              const activeUserData = usersData.find(user => user._id === activeUser.id);
              if (!activeUserData) {
                  console.error('Active user data not found.');
                  return;
              }
  
              const index = activeUserData.pkmnSeen.indexOf(this.pokemon._id);
              if (index === -1) {
                  activeUserData.pkmnSeen.push(this.pokemon._id);
              } else {
                  activeUserData.pkmnSeen.splice(index, 1);
              }
  
              localStorage.setItem('users', JSON.stringify(usersData));
              this.isPokemonSeen = !this.isPokemonSeen;
          },
          toggleCatch() {
              const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
              if (!activeUser || !activeUser.id) {
                  console.error('No active user found.');
                  return;
              }
  
              const usersData = JSON.parse(localStorage.getItem('users'));
              if (!usersData || !Array.isArray(usersData)) {
                  console.error('No user data found.');
                  return;
              }
  
              const activeUserData = usersData.find(user => user._id === activeUser.id);
              if (!activeUserData) {
                  console.error('Active user data not found.');
                  return;
              }
  
              const index = activeUserData.pkmnCatch.indexOf(this.pokemon._id);
              if (index === -1) {
                  activeUserData.pkmnCatch.push(this.pokemon._id);
                  if (!this.isPokemonSeen) {
                      activeUserData.pkmnSeen.push(this.pokemon._id);
                      this.isPokemonSeen = true;
                  }
              } else {
                  activeUserData.pkmnCatch.splice(index, 1);
              }
  
              localStorage.setItem('users', JSON.stringify(usersData));
              this.isPokemonCaught = !this.isPokemonCaught;
          }
      },
      mounted() {
          document.title = 'Pokedex | ' + this.pokemon.name;
      },
      components: {
          PokemonType
      }
  };
  </script>

  
<style lang="sass" scoped>
@import '/src/styles/main.sass'
.container
    display: flex
    flex-wrap: wrap
    width: 100%
    height: 100vh
    padding: 3vw

.media
    flex: 1 1 50%

    &-inner
        background-color: $light
        border-radius: 30px
        border: 3px grey solid
        width: 500px
        padding: 1vw
        margin: auto
    img
        width: 100%
        height: auto

.content
    flex: 1 1 50%
    font-family: $ff1
    height: 500px

    &-table
        border-collapse: collapse

    &-title
        border-radius: 10px 10px 5px 5px
        padding: 20px
        color: $light
        font-weight: bold
        font-size: 1.5em
        letter-spacing: 1px

    &-line
        td
            background: rgba(lighten($grass,41%), .65)
            padding: 20px

        &.firstRow
            td:first-of-type
                border-radius: 5px 0 0 0
            td:last-of-type
                border-radius: 0 5px 0 0

            &.oneColumn
                td
                    border-radius: 5px 5px 0 0
                    padding: 0
                    span
                        border-end-start-radius: 0
                        border-end-end-radius: 0 
        &.lastRow
            td:first-of-type
                border-radius: 0 0 0 5px
            td:last-of-type
                border-radius: 0 0 5px 0
        &.aloneRow
            td:first-of-type
                border-radius: 5px 0 0 5px
            td:last-of-type
                border-radius: 0 5px 5px 0

    &-label
        span
            background: $light
            border-radius: 5px
            padding: 5px 15px
            width: 100%
            display: block
            text-align: center
    &-number
        text-align: center
    .separator
        height: 5px

    &-data
        .chipsContainer
            display: flex
            gap: 5px

#homeBtn
    position: absolute
    top: 0
    left: 0
    background-color: palevioletred
    text-decoration: none
    color: $light
    font-weight: bold
    padding: 5px
    font-family: sans-serif




// Gestion des types, ne pas écrire après cette ligne pour ne pas perdre de lisibilité
.container
    &.bug
        background: $bug-gradient
        .content
            &-title
                background: $bug
            &-line
                td
                    background: rgba(lighten($bug,41%), .65)

    &.dark
        background: $dark-gradient
        .content
            &-title
                background: $dark
            &-line
                td
                    background: rgba(lighten($dark,41%), .65)

    &.dragon
        background: $dragon-gradient
        .content
            &-title
                background: $dragon
            &-line
                td
                    background: rgba(lighten($dragon,41%), .65)

    &.electric
        background: $electric-gradient
        .content
            &-title
                background: $electric
            &-line
                td
                    background: rgba(lighten($electric,41%), .65)

    &.fairy
        background: $fairy-gradient
        .content
            &-title
                background: $fairy
            &-line
                td
                    background: rgba(lighten($fairy,41%), .65)

    &.fighting
        background: $fighting-gradient
        .content
            &-title
                background: $fighting
            &-line
                td
                    background: rgba(lighten($fighting,41%), .65)

    &.fire
        background: $fire-gradient
        .content
            &-title
                background: $fire
            &-line
                td
                    background: rgba(lighten($fire,41%), .65)

    &.flying
        background: $flying-gradient
        .content
            &-title
                background: $flying
            &-line
                td
                    background: rgba(lighten($flying,41%), .65)

    &.ghost
        background: $ghost-gradient
        .content
            &-title
                background: $ghost
            &-line
                td
                    background: rgba(lighten($ghost,41%), .65)

    &.normal
        background: $normal-gradient
        .content
            &-title
                background: $normal
            &-line
                td
                    background: rgba(lighten($normal,41%), .65)

    &.grass
        background: $grass-gradient
        .content
            &-title
                background: $grass
            &-line
                td
                    background: rgba(lighten($grass,41%), .65)

    &.ground
        background: $ground-gradient
        .content
            &-title
                background: $ground
            &-line
                td
                    background: rgba(lighten($ground,41%), .65)

    &.ice
        background: $ice-gradient
        .content
            &-title
                background: $ice
            &-line
                td
                    background: rgba(lighten($ice,41%), .65)

    &.poison
        background: $poison-gradient
        .content
            &-title
                background: $poison
            &-line
                td
                    background: rgba(lighten($poison,41%), .65)

    &.psychic
        background: $psychic-gradient
        .content
            &-title
                background: $psychic
            &-line
                td
                    background: rgba(lighten($psychic,41%), .65)

    &.rock
        background: $rock-gradient
        .content
            &-title
                background: $rock
            &-line
                td
                    background: rgba(lighten($rock,41%), .65)

    &.steel
        background: $steel-gradient
        .content
            &-title
                background: $steel
            &-line
                td
                    background: rgba(lighten($steel,41%), .65)

    &.water
        background: $water-gradient
        .content
            &-title
                background: $water
            &-line
                td
                    background: rgba(lighten($water,41%), .65)

  
</style>
  