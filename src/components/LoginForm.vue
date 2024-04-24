<template>
  <SiteOverlay/>
    <div class="formContainer">
      <h1>Connexion</h1>
      <form @submit.prevent="login">
          <div>
            <label for="username">Nom d'utilisateur:</label>
            <input type="text" id="username" v-model="username">
          </div>
          <div>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" v-model="password">
          </div>
          <button type="submit">Connexion</button>
      </form>
      <p v-if="loginError" style="color: red;">Identifiants incorrects</p>
    </div>
</template>

<script>
import SiteOverlay from './children/SiteOverlay.vue';
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
          // Vérifier si le nom d'utilisateur est "error"
          if (this.username === 'error') {
            this.loginError = true;
          } else {
            //Redirection vers la home page
            this.$router.push({ name: 'Home' });
          }
      }
    },
    components: {
      SiteOverlay
    },
    mounted() {
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