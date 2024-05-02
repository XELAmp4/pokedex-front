<template>
    <div class="formContainer">
        <h1>Edit your profile</h1>
        <form @submit.prevent="updateProfile">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="newPassword">
            </div>
            <div>
                <label for="confirmPassword">Confirm password:</label>
                <input type="password" id="confirmPassword" v-model="confirmNewPassword">
            </div>
            <div>
                <label for="imgUrl">URL of your profile picture:</label>
                <input type="text" id="imgUrl" v-model="imgUrl" required>
            </div>
            <button type="submit">Update</button>
            <button class="comeBack" @click="comeBack">Cancel</button>
        </form>
        <p v-if="updateError" style="color: red; background-color: #ff000012; padding: 5px; border: 1px solid #ff00009c; border-radius: 5px;">Error during the update</p>
    </div>
</template>

<script>
import SessionManager from '/src/sessionManager.js';
import usersData from '/datas/users.json';

export default {
    data() {
        return {
            userId: '',
            username: '',
            newPassword: '',
            confirmNewPassword: '',
            imgUrl: '',
            updateError: false
        };
    },
    methods: {
        updateProfile() {
            // Vérification que les mots de passe correspondent
            if (this.newPassword !== this.confirmNewPassword) {
                this.updateError = true;
                return;
            }

            // Recherche de l'index de l'utilisateur dans les données
            const userIndex = usersData.findIndex(user => user._id === this.userId);
            if (userIndex === -1) {
                this.updateError = true;
                return;
            }

            // Mise à jour des données de l'utilisateur
            const updatedUser = usersData[userIndex];
            updatedUser.password = this.newPassword || updatedUser.password; // Mise à jour du mot de passe si un nouveau mot de passe est fourni
            updatedUser.imgURL = this.imgUrl;
            updatedUser.username = this.username;

            // Mise à jour des données dans le local storage
            localStorage.setItem("users", JSON.stringify(usersData));

            // Redirection vers la page d'accueil ou de profil
            this.$router.push({ name: 'Profile' });
        },
        comeBack(){
            this.$router.push({ name: 'Profile' });
        }
    },
    mounted() {
        document.title = 'Pokedex | Edit Profile';

        // Récupération de l'ID de l'utilisateur actuellement connecté depuis ActiveUser
        this.userId = SessionManager.getSessionData('ActiveUser').id;

        // Recherche de l'utilisateur dans les données en utilisant son ID
        const activeUser = usersData.find(user => user._id === this.userId);
        if (activeUser) {
            this.username = activeUser.username;
            this.imgUrl = activeUser.imgURL;
        }
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
    border-color: #42b883
  
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
    background-color: #42b883
    color: white
    cursor: pointer
    transition: background-color 0.3s ease
  
    &:hover
        background-color: darken(#42b883, 10% )

    &.comeBack
        background-color: #f04e4e

        &:hover
            background-color: darken(#f04e4e, 10% )
  
  .error-message
      color: red
      margin-top: 10px
      transition: opacity 0.3s ease
  
  .error-message.show
      opacity: 1
  
</style>