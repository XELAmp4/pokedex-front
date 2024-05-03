<template>
    <div>
        <BurgerMenu/>

        <section class="profile-container">
            <div class="profile-header">
                <img v-if="userData" class="profile-image" :src="userData.imgURL" alt="profile picture">
                <div class="profile-infos">
                    <span v-if="userData" class="profile-username">{{ userData.username }}</span>
                    <span v-if="userData" :class='"profile-role "+ userRole'>{{ userRole }}</span>
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
                <button @click="letsEdit" class="profile-btnEdit">Edit profile</button>
                <button @click="disconnectUser" class="profile-btnLogout">Log out</button>
            </div>
        </section>
    </div>
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
            SessionManager.clearSessionData('ActiveUser');
            this.$router.push({ name: 'Login' });
        },
        letsEdit() {
            this.$router.push({ name: 'EditProfile' });
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

.profile-container
    font-family: $ff1
    background: $light
    width: 90vw
    margin: auto
    padding: 20px
    border-radius: 20px
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
    text-align: center
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)

.profile-header
    display: flex
    align-items: center
    justify-content: center
    margin-bottom: 20px

.profile-image
    border-radius: 50%
    width: 100px
    height: 100px
    object-fit: cover
    margin-right: 20px

.profile-infos
    display: flex
    flex-direction: column

.profile-username
    font-size: 24px
    font-weight: bold
    margin-bottom: 5px

.profile-role
    color: grey
    background-color: lighten(grey, 40%)
    border: 1px solid grey
    border-radius: 5px
    padding: 2px 5px

    &.admin
        color: #ffcc00
        background-color: lighten(#ffcc00, 45%)
        border: 1px solid #ffcc00

    &.trainer
        color: #007bff
        background-color: lighten(#007bff, 45%)
        border: 1px solid #007bff

.profile-body
    display: flex
    justify-content: space-around
    margin-bottom: 20px

.profile-datas
    display: flex
    flex-direction: column
    align-items: center

.profile-label
    font-weight: bold
    margin-bottom: 5px

.profile-dataPercentage
    font-size: 20px
    color: #42b883
    margin-bottom: 5px

.profile-dataNumber
    color: #666

.profile-cta
    display: flex
    justify-content: center

.profile-btnEdit,
.profile-btnLogout
    padding: 10px 20px
    margin: 0 10px
    border: none
    border-radius: 5px
    font-size: 16px
    cursor: pointer

.profile-btnEdit
    background-color: #42b883
    color: #fff

.profile-btnLogout
    background-color: #f04e4e
    color: #fff
</style>
