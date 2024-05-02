<template>
    
    <div class="formContainer">
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div>
                <label for="confirmPassword">Confirm password:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required>
            </div>
            <router-link to="/login" class="loginLink">Already have an account? Log in!</router-link>
            <button type="submit">Register</button>
        </form>
        <p v-if="registrationError" style="color: red; background-color: #ff000012; padding: 5px; border: 1px solid #ff00009c; border-radius: 5px;">Error during the registration</p>
    </div>
</template>

<script>
import SessionManager from '/src/sessionManager.js';
import usersData from '/datas/users.json';

export default {
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            registrationError: false
        };
    },
    methods: {
        register() {
            // Vérification que les mots de passe correspondent
            if (this.password !== this.confirmPassword) {
                this.registrationError = true;
                return;
            }

            // Vérification si l'utilisateur existe déjà
            const existingUser = usersData.find(user => user.username === this.username);
            if (existingUser) {
                this.registrationError = true;
                return;
            }

            // Création de l'utilisateur avec les données fournies
            const newUser = {
                "_id": this.username,
                "password": this.password,
                "isAdmin": false,
                "username": this.username,
                "imgURL": "https://www.bybatisol.com/app/themes/bybatisol/img/default-pp.jpg",
                "pkmnCatch": [],
                "pkmnSeen": [],
                "_class": "UserData"
            };

            // Ajout de l'utilisateur dans le local storage
            usersData.push(newUser);
            localStorage.setItem("users", JSON.stringify(usersData));

            // Connexion automatique de l'utilisateur après l'inscription
            SessionManager.setSessionData('ActiveUser', { id: newUser._id });

            // Redirection vers la page d'accueil
            this.$router.push({ name: 'Home' });
        }
    },
    mounted() {
        document.title = 'Pokedex | Inscription';
    }
};
</script>

<style lang="sass" scoped>
  @import '/src/styles/main.sass'

  h1
    text-transform: uppercase
    margin-bottom: 10px

  .formContainer
    width: 300px
    padding: 20px
    font-family: $ff1
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
    gap: 5px
  
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
    text-transform: uppercase
    font-weight: bold
    font-size: 1em
    letter-spacing: 1px
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

  .loginLink
    color: #007bff
    text-decoration: none
  
  </style>

