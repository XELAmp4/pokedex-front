<template>
    
    <div class="formContainer">
        <h1>Inscription</h1>
        <form @submit.prevent="register">
            <div>
                <label for="username">Nom d'utilisateur:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div>
                <label for="confirmPassword">Confirmer le mot de passe:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required>
            </div>
            <button type="submit">S'inscrire</button>
        </form>
        <p v-if="registrationError" style="color: red;">Erreur lors de l'inscription</p>
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
