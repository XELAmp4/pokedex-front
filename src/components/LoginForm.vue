<template>
    <SiteOverlay/>
    <div class="formContainer">
        <h1>Login</h1>
        <form>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" @keydown.enter="login">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" @keydown.enter="login">
            </div>
            <button type="button" @click="login">Login</button>
        </form>
        <p v-if="loginError" style="color: red; background-color: #ff000012; padding: 5px; border: 1px solid #ff00009c; border-radius: 5px;">Incorrect credentials</p>
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
                // Authentication successful, redirect to the home page
                this.$router.push({ name: 'Home' });
            } else {
                // Display error message if credentials are incorrect
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
    background-color: #f9f9f9
    border-radius: 8px
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
    text-align: center
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)
  
  .formContainer>form, .formContainer>form>div
    display: flex
    flex-direction: column
    align-items: center
  
  .inputContainer
    margin-bottom: 15px
    width: 100%
  
  input[type="text"], input[type="password"]
    width: calc(100% - 10px)
    padding: 10px
    border: 1px solid #ddd
    border-radius: 5px
    background-color: #fff
    transition: border-color 0.3s ease
  
  input[type="text"]:focus, input[type="password"]:focus
    border-color: #007bff
  
  button
    width: 100%
    padding: 12px 20px
    margin: 8px 0
    border: none
    border-radius: 5px
    background-color: #007bff
    color: white
    cursor: pointer
    transition: background-color 0.3s ease
  
  button:hover
    background-color: darken(#007bff, 10% )
  
  .error-message
      color: red
      margin-top: 10px
      transition: opacity 0.3s ease
  
  .error-message.show
      opacity: 1
  
  </style>
  