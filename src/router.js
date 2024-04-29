import { createRouter, createWebHistory } from 'vue-router'; 
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import HomePage from './components/HomePage.vue';
import ProfilePage from './components/ProfilePage.vue';
import PokemonDetails from './components/PokemonDetails.vue';
import pokemonData from '/datas/pokemon.json';



const router = createRouter({
  history: createWebHistory(),
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
          next('/home'); // Redirige vers la page d'accueil si l'utilisateur est déjà connecté
        } else {
          next(); // Sinon, laissez l'utilisateur accéder à la page de connexion
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
          next('/home'); // Redirige vers la page d'accueil si l'utilisateur est déjà connecté
        } else {
          next(); // Sinon, laissez l'utilisateur accéder à la page de connexion
        }
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    { path: '/pokemon/:name', 
      component: PokemonDetails,
      meta: { requiresAuth: true },
      props: (route) => ({ // Utilisez une fonction pour définir les props dynamiquement
        pokemon: pokemonData.find(p => p.name.toLowerCase() === route.params.name.toLowerCase())
      })
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.path.startsWith('/pokemon/')) {
//     const pokemonName = to.params.name.toLowerCase(); // Convertir en minuscules pour correspondre au JSON
//     // Vérifiez si le Pokémon existe dans le JSON
//     const pokemonExists = pokemonData.find(pokemon => pokemon.name.toLowerCase() === pokemonName);
//     if (pokemonExists) {
//       // Si le Pokémon existe, passez le nom du Pokémon comme propriété à PokemonDetails
//       next();
//     } else {
//       // Si le Pokémon n'existe pas, redirigez vers la page 404
//       next('/home');
//     }
//   } else {
//     // Si la route ne contient pas de paramètre de nom de Pokémon, continuez normalement
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ActiveUser'); // Vérifie si l'utilisateur est connecté
  if (to.matched.some(record => record.meta.requiresAuth)) { // Vérifie si la route nécessite une authentification
    if (!isAuthenticated) {
      // Si l'utilisateur n'est pas connecté et tente d'accéder à une route protégée, redirigez-le vers la page de connexion
      next('/login');
    } else {
      // Si l'utilisateur est connecté, laissez-le accéder à la route protégée
      next();
    }
  } else if (to.path.startsWith('/pokemon/')) {
    const pokemonName = to.params.name.toLowerCase(); // Convertir en minuscules pour correspondre au JSON
    // Vérifiez si le Pokémon existe dans le JSON
    const pokemonExists = pokemonData.find(pokemon => pokemon.name.toLowerCase() === pokemonName);
    if (pokemonExists) {
      // Si le Pokémon existe, passez le nom du Pokémon comme propriété à PokemonDetails
      next();
    } else {
      // Si le Pokémon n'existe pas, redirigez vers la page 404
      next('/home');
    }
  } else {
    // Si la route ne nécessite pas d'authentification et n'est pas une route Pokémon, laissez l'utilisateur accéder normalement
    next();
  }
});


export default router;
