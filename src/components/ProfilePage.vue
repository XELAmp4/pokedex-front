<template>
    <BurgerMenu/>
    <h1>Profil</h1>

    <section class="profile-container">
        <div class="profile-header">
            <img v-if="userData" class="profile-image" :src="userData.imgURL" alt="profile picture">
            <div class="profile-infos">
                <span v-if="userData" class="profile-username">{{ userData.username }}</span>
                <span v-if="userData" class="profile-role">{{ userRole }}</span>
            </div>
        </div>
        <div class="profile-body">
            <div v-if="userData.pkmnSeen" class="profile-datas">
                <span class="profile-label">Pokemons seen</span>
                <span v-if="userData.pkmnSeen" class="profile-dataPercentage">{{ getPercentage(userData.pkmnSeen.length) }}%</span>
                <span v-if="userData.pkmnSeen" class="profile-dataNumber">{{ userData.pkmnSeen.length }}/{{ maxPokemon }}</span>
            </div>
            <div v-if="userData.pkmnCatch" class="profile-datas">
                <span class="profile-label">Pokemons catch</span>
                <span v-if="userData.pkmnCatch" class="profile-dataPercentage">{{ getPercentage(userData.pkmnCatch.length) }}%</span>
                <span v-if="userData.pkmnCatch" class="profile-dataNumber">{{ userData.pkmnCatch.length }}/{{ maxPokemon }}</span>
            </div>
        </div>
        <div class="profile-cta">
            <button class="profile-btnEdit">Edit profile</button>
            <button @click="disconnectUser" class="profile-btnLogout">Log out</button>
        </div>
    </section>
</template>


<script>
import SessionManager from '/src/sessionManager.js';
import BurgerMenu from './children/BurgerMenu.vue';

export default {
    data() {
        return {
            userData: {},
            userRole: '',
            maxPokemon: 100 // Remplacer par la valeur réelle du nombre maximum de Pokémon
        };
    },
    mounted() {
        document.title = 'Pokedex | Profil';
        this.loadUserData();
    },
    components: {
        BurgerMenu
    },
    methods: {
        disconnectUser() {
            console.log('dedans');
            SessionManager.clearSessionData('ActiveUser');
            this.$router.push({ name: 'Login' });
        },
        loadUserData() {
            const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
            const users = JSON.parse(localStorage.getItem('users'));
            const pokemons = JSON.parse(localStorage.getItem('pokemons'));
            if (activeUser && users && pokemons) {
                const userId = activeUser.id;
                const userData = users.find(user => user._id === userId);
                if (userData) {
                    this.userData = userData;
                    this.userRole = userData.isAdmin ? 'admin' : 'trainer';
                    this.maxPokemon = pokemons.length;
                    console.log(userData.pkmnCatch);
                }
            }
            
        },
        getPercentage(count) {
            return ((count / this.maxPokemon) * 100).toFixed(2);
        }
    }
}
</script>

<style lang="sass" scoped>
@import '/src/styles/main.sass'
.profile
    &-container
        font-family: $ff1
        background: $light
        width: 90vw
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        padding: 2.5vw
        border: 1px solid grey
        border-radius: 30px 

    &-header
        display: flex
        align-items: center

    &-infos
        display: flex
        flex-direction: column

    &-image
        border-radius: 100%
        width: 100px

    &-body
        width: 100%
        display: flex
        justify-content: space-between

    &-datas
        width: 48%
        border: 1px purple solid
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        
</style>
