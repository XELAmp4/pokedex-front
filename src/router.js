import { createRouter, createWebHistory } from 'vue-router'; 
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import HomePage from './components/HomePage.vue';
import ProfilePage from './components/ProfilePage.vue';
import EditProfile from './components/EditProfile.vue';
import PokemonDetails from './components/PokemonDetails.vue';
import addPokemon from './components/AddPokemon.vue';
import EditPokemon from './components/EditPokemon.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Utilisez process.env.BASE_URL pour la base URL
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('ActiveUser');
        if (isAuthenticated) {
          next('/home');
        } else {
          next();
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterForm,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('ActiveUser');
        if (isAuthenticated) {
          next('/home');
        } else {
          next();
        }
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/add',
      name: 'addPokemon',
      component: addPokemon,
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    { 
      path: '/edit/:name', 
      component: EditPokemon,
      props: (route) => ({ 
        pokemon: getPokemon(route.params.name)
      })
    },
    { 
      path: '/pokemon/:name', 
      component: PokemonDetails,
      props: (route) => ({ 
        pokemon: getPokemon(route.params.name)
      })
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/edit',
      name: 'EditProfile',
      component: EditProfile,
      meta: { requiresAuth: true }
    },
    // Rediriger vers la page d'accueil pour les routes non trouvées
    { 
      path: '/:catchAll(.*)', // Utilisez catch-all pour les routes non trouvées
      redirect: '/home' // Redirigez vers la page d'accueil
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ActiveUser'); 
  const isAdmin = isAuthenticated ? JSON.parse(localStorage.getItem('users')).find(user => user._id === JSON.parse(isAuthenticated).id)?.isAdmin : false; // Vérifier si l'utilisateur est administrateur
  if (to.matched.some(record => record.meta.requiresAuth)) { 
    if (!isAuthenticated) {
      next('/login');
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) { // Vérifier si l'administration est nécessaire et si l'utilisateur est administrateur
        next('/home');
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

// Fonction pour récupérer les données d'un Pokémon à partir du local storage
function getPokemon(name) {
  const pokemons = JSON.parse(localStorage.getItem('pokemons')) || []; // Récupérer les données des Pokémon à partir du local storage
  return pokemons.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
}

export default router;
