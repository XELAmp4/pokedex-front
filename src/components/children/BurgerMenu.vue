<template>
  <div>
    <!-- Element déclencheur du menu burger -->
    <button @click="toggleMenu" class="burger-menu-trigger">☰</button>

    <!-- Body backdrop -->
    <div v-if="showMenu" class="body-backdrop" @click="closeMenu"></div>

    <!-- Menu burger -->
    <transition name="slide">
      <div v-if="showMenu" class="burger-menu" @click.stop>
        <!-- Contenu du menu -->
        <ul>
          <li @click="closeMenu"><router-link to="/home">Home</router-link></li>
          <li @click="closeMenu"><router-link to="/profile">Profile</router-link></li>
          <li v-if="isAdminUser" @click="closeMenu"><router-link to="/add" class="btnNewPokemon">New Pokemon</router-link></li>
        </ul>
        <button @click="disconnectUser" class="btnDisconnect">Disconnect</button>
      </div>
    </transition>
  </div>
</template>

<script>
import SessionManager from '/src/sessionManager.js';
export default {
  data() {
    return {
      showMenu: false,
      isAdminUser: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
      if (this.showMenu) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    },
    closeMenu() {
      this.showMenu = false;
      document.body.classList.remove('menu-open');
    },
    disconnectUser(){
      SessionManager.clearSessionData('ActiveUser');
      this.closeMenu();
      this.$router.push({ name: 'Login' });
    },
    checkAdminUser() {
      const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
      if (activeUser) {
        const users = JSON.parse(localStorage.getItem('users'));
        const currentUser = users.find(user => user._id === activeUser.id);
        if (currentUser && currentUser.isAdmin) {
          this.isAdminUser = true;
        }
      }
    }
  },
  created() {
    this.checkAdminUser();
  }
};
</script>

<style scoped>
/* Styles pour le bouton du menu burger */
.burger-menu-trigger {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

/* Styles pour le body backdrop */
.body-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 997;
}

/* Styles pour le menu burger */
.burger-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #f9f9f9; /* Blanc cassé */
  z-index: 998;
  padding-top: 50px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

/* Styles pour les éléments du menu */
.burger-menu ul {
  list-style-type: none;
  padding: 0;
}

.burger-menu li {
  padding: 20px;
}

.burger-menu a {
  color: #333; /* Couleur de texte pour les liens */
  text-decoration: none;
}

.burger-menu a.btnNewPokemon {
  color: white;
}

/* Animation de glissement pour le menu burger */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

/* Style pour désactiver le scroll lorsque le menu est ouvert */
.menu-open {
  overflow: hidden;
}

/* Style pour le bouton de déconnexion */
.btnDisconnect {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ff4d4d; /* Rouge */
  color: #fff;
  border: none;
  cursor: pointer;
}

/* Style pour le bouton New Pokemon */
.btnNewPokemon {
  background-color: #4caf50; /* Vert */
  padding: 10px;
  border-radius: 5px;
  display: block;
  color: white;
  text-align: center;
}
</style>
