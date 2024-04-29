<template>
    <form @submit.prevent="register">
         <div>
             <label for="email">Email:</label>
             <input type="text" id="email" v-model="email">
         </div>
         <div>
             <label for="username">User name:</label>
             <input type="text" id="username" v-model="username">
         </div>
         <div>
             <label for="password">Password:</label>
             <input type="password" id="password" v-model="password">
         </div>
         <button type="submit">Register</button>
     </form>
 </template>
 
 <script>
 export default {
     data() {
         return {
             email: '',
             username: '',
             password: ''
         };
     },
     methods: {
         register() {
             // Créer un objet avec les données du formulaire
             const userData = {
                 email: this.email,
                 username: this.username,
                 password: this.password
             };
 
             this.saveDataLocally(userData);
 
             // Effacer les champs après la soumission
             this.email = '';
             this.username = '';
             this.password = '';
         },
         saveDataLocally(userData) {
             // Charger les données existantes depuis le fichier JSON (s'il y en a)
             let existingData = JSON.parse(localStorage.getItem('userData')) || [];
             
             // Ajouter les nouvelles données à la liste existante
             existingData.push(userData);
 
             // Sauvegarder les données mises à jour dans le fichier JSON
             localStorage.setItem('userData', JSON.stringify(existingData));
         }
     }
 };
 </script>
 
 <style lang="sass">
 @import '/src/styles/main.sass'
 </style>
 