<template>
  <SiteOverlay/>
  <div class="formContainer">
      <h1>Connexion</h1>
      <form>
          <div>
              <label for="username">Nom d'utilisateur:</label>
              <input type="text" id="username" v-model="username">
          </div>
          <div>
              <label for="password">Mot de passe:</label>
              <input type="password" id="password" v-model="password">
          </div>
          <button type="button" @click="login">Connexion</button>
      </form>
      <p v-if="loginError" style="color: red;">Identifiants incorrects</p>
  </div>
</template>

<script>
import SessionManager from '/src/sessionManager.js';

import SiteOverlay from './children/SiteOverlay.vue';

import pokemonData from '/datas/pokemon.json';
import usersData from '/datas/users.json';
import typesData from '/datas/types.json';

export default {
  data() {
      return {
          username: '',
          password: '',
          loginError: false
      };
  },
  methods: {
      login() {
          const users = JSON.parse(localStorage.getItem('users'));
          console.log(users);
          const user = users.find(user => user.username === this.username && user.password === this.password);
          if (user) {
              SessionManager.setSessionData('ActiveUser', { id: user._id });
              // Authentification réussie, rediriger vers la page d'accueil
              this.$router.push({ name: 'Home' });
          } else {
              // Afficher un message d'erreur si les identifiants sont incorrects
              this.loginError = true;
          }
      },
      addToLocalStorage(){
          if (!localStorage.getItem('pokemons')) {
              localStorage.setItem("pokemons", JSON.stringify(pokemonData));
          }
          if (!localStorage.getItem('types')) {
              localStorage.setItem("types", JSON.stringify(typesData));
          }
          if (!localStorage.getItem('users')) {
              localStorage.setItem("users", JSON.stringify(usersData));
          }
      }
  },
  components: {
      SiteOverlay
  },
  mounted() {
      this.addToLocalStorage();
      document.title = 'Pokedex | Login';
  }
};
</script>

<style lang="sass" scoped>
@import '/src/styles/main.sass'
.formContainer
  width: 300px
  padding: 20px
  background-color: white
  border-radius: 8px
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
  text-align: center
  margin: auto 


.formContainer>form,.formContainer>form>div
  display: flex
  flex-direction: column
  align-items: center

</style>
