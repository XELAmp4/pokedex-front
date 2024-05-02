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
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/profile">Profile</router-link></li>
            <li><a @click="disconnectUser" class="btnDisconnect">Disconnect</a></li>
          </ul>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import SessionManager from '/src/sessionManager.js';
  export default {
    data() {
      return {
        showMenu: false
      };
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
        if (this.showMenu) {
          // Ajouter une classe au body pour désactiver le scroll
          document.body.classList.add('menu-open');
        } else {
          // Supprimer la classe du body pour réactiver le scroll
          document.body.classList.remove('menu-open');
        }
      },
      closeMenu() {
        this.showMenu = false;
        document.body.classList.remove('menu-open');
      },
      disconnectUser(){
        console.log('dedans');
        SessionManager.clearSessionData('ActiveUser');
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour le bouton du menu burger */
  .burger-menu-trigger {
    position: fixed;
    top: 20px;
    right: 20px; /* Positionnement à droite de l'écran */
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
    background-color: rgba(0, 0, 0, 0.5); /* Noir avec opacité à 0.5 */
    z-index: 997; /* Juste en dessous du menu */
  }
  
  /* Styles pour le menu burger */
  .burger-menu {
    position: fixed;
    top: 0;
    right: 0; /* Positionnement à droite de l'écran */
    width: 200px;
    height: 100%;
    background-color: #333;
    z-index: 998;
    padding-top: 50px; /* Assurez-vous que le contenu ne soit pas caché sous la barre de navigation */
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5); /* Ombre sur le côté */
    overflow-y: auto; /* Activation du défilement vertical dans le menu */
  }
  
  /* Styles pour les éléments du menu */
  .burger-menu ul {
    list-style-type: none;
    padding: 0;
  }
  
  .burger-menu li {
    padding: 10px;
  }
  
  .burger-menu a {
    color: #fff;
    text-decoration: none;
  }
  
  /* Animation de glissement pour le menu burger */
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
  }
  
  .slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    transform: translateX(100%); /* Fait glisser le menu depuis la droite */
  }
  
  /* Style pour désactiver le scroll lorsque le menu est ouvert */
  .menu-open {
    overflow: hidden;
  }
  </style>
  