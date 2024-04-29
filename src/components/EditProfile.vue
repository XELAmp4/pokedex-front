<template>
    <div class="formContainer">
        <h1>Edit your profile</h1>
        <form @submit.prevent="updateProfile">
            <div>
                <label for="username">Nom d'utilisateur:</label>
                <input type="text" id="username" v-model="username">
            </div>
            <div>
                <label for="password">Nouveau mot de passe:</label>
                <input type="password" id="password" v-model="newPassword">
            </div>
            <div>
                <label for="confirmPassword">Confirmer le mot de passe:</label>
                <input type="password" id="confirmPassword" v-model="confirmNewPassword">
            </div>
            <div>
                <label for="imgUrl">URL de l'image:</label>
                <input type="text" id="imgUrl" v-model="imgUrl" required>
            </div>
            <button type="submit">Mettre à jour</button>
        </form>
        <p v-if="updateError" style="color: red;">Erreur lors de la mise à jour du profil</p>
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
