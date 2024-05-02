import { createRouter, createWebHistory } from 'vue-router'; 
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import HomePage from './components/HomePage.vue';
import ProfilePage from './components/ProfilePage.vue';
import EditProfile from './components/EditProfile.vue';
import PokemonDetails from './components/PokemonDetails.vue';
import pokemonData from '/datas/pokemon.json'; // Correction du chemin du fichier JSON


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
      path: '/pokemon/:name', 
      component: PokemonDetails,
      props: (route) => ({ 
        pokemon: pokemonData.find(p => p.name.toLowerCase() === route.params.name.toLowerCase())
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
  if (to.matched.some(record => record.meta.requiresAuth)) { 
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;