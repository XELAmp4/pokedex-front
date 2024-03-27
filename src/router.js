import { createRouter, createWebHistory } from 'vue-router'; 
import LoginForm from './components/LoginForm.vue';
import HomePage from './components/HomePage.vue';
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
      component: LoginForm
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    { path: '/pokemon/:name', 
      component: PokemonDetails, 
      props: (route) => ({ // Utilisez une fonction pour définir les props dynamiquement
        pokemon: pokemonData.find(p => p.name.toLowerCase() === route.params.name.toLowerCase())
      })
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/pokemon/')) {
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
    // Si la route ne contient pas de paramètre de nom de Pokémon, continuez normalement
    next();
  }
});


export default router;
