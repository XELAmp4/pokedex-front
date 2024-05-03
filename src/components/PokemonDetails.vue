    <template>
        <BurgerMenu/>
        <div  :class="'container ' + pokemon.types[0].toLowerCase() ">
            <div class="media">
                <div class="media-inner">
                    <img :src="pokemon.imgUrl" :alt="pokemon.name">
                </div>
                <div class="parameters">
                    <div class="checkboxContainer">
                        <PictoSeen/>
                        <input v-model="isPokemonSeen" type="checkbox" :disabled="isPokemonCaught" @click="toggleSeen">
                    </div>
                    <div class="checkboxContainer">
                        <PictoCatch/>
                        <input v-model="isPokemonCaught" type="checkbox" @click="toggleCatch">
                    </div>
                </div>
            </div>

            <div class="content">
                <table class="content-table">
                    <tr>
                        <td colspan="3" style="text-align: center;" class="content-title">{{ pokemon.name }}</td>
                    </tr>
                    <tr class="separator"></tr>
                    <tr class="content-line aloneRow">
                        <td class="content-label" colspan="2" style="width: 66.66%;"><span>Types</span></td>
                        <td class="content-data" style="width: 33.33%;">
                            <div class="chipsContainer">
                                <PokemonType
                                    v-for="(type, index) in pokemon.types"
                                    :key="index"
                                    :type="type"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr class="separator"></tr>
                    <tr class="content-line firstRow oneColumn">
                        <td class="content-label" colspan="3" style="width: 100%;"><span>Regions</span></td>
                    </tr>

                    <tr v-for="(region, index) in pokemon.regions" :key="index" :class="['content-line', index === pokemon.regions.length - 1 ? 'lastRow' : '']">
                        <td class="content-label" colspan="2" style="width: 50%;"><span>{{ region.regionName }}</span></td>
                        <td class="content-number" style="width: 50%;"><span>{{ '#' + region.regionPokedexNumber }}</span></td>
                    </tr>

                    <tr class="separator"></tr>
                    <tr class="content-line firstRow oneColumn">
                        <td class="content-label" colspan="3" style="width: 100%;"><span>Description</span></td>
                    </tr>
                    <tr class="content-line lastRow">
                        <td colspan="3" style="width: 100%;">{{ pokemon.description }}</td>
                    </tr>
                    <div class="tools">
                        <button v-if="isAdminUser" class="btnTool isDelete" @click="deletePokemon"><PictoBin/></button>
                        <router-link v-if="isAdminUser" class="btnTool isEdit" :to="'/edit/' + pokemon.name"><PictoPen/></router-link>
                    </div>
                </table>
                <button class="readerBtn" @click="speakText"><PictoAudio/></button>
            </div>
            
        </div>
    </template>
    
<script>
    import PokemonType from './children/PokemonType.vue'
    import PictoSeen from './children/PictoSeen.vue'
    import PictoCatch from './children/PictoCatch.vue'
    import PictoAudio from './children/PictoAudio.vue'
    import PictoPen from './children/PictoPen.vue'
    import PictoBin from './children/PictoBin.vue'
    import BurgerMenu from './children/BurgerMenu.vue'

    
    export default {
        props: {
            pokemon: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                isPokemonSeen: false,
                isPokemonCaught: false,
                isAdminUser: false,
                txt: "test"
            };
        },
        methods: {
            toggleSeen() {
                const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
                if (!activeUser || !activeUser.id) {
                    console.error('No active user found.');
                    return;
                }
    
                const usersData = JSON.parse(localStorage.getItem('users'));
                if (!usersData || !Array.isArray(usersData)) {
                    console.error('No user data found.');
                    return;
                }
    
                const activeUserData = usersData.find(user => user._id === activeUser.id);
                if (!activeUserData) {
                    console.error('Active user data not found.');
                    return;
                }
    
                const index = activeUserData.pkmnSeen.indexOf(this.pokemon._id);
                if (index === -1) {
                    activeUserData.pkmnSeen.push(this.pokemon._id);
                } else {
                    activeUserData.pkmnSeen.splice(index, 1);
                }
    
                localStorage.setItem('users', JSON.stringify(usersData));
                this.isPokemonSeen = !this.isPokemonSeen;
            },
            toggleCatch() {
                const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
                if (!activeUser || !activeUser.id) {
                    console.error('No active user found.');
                    return;
                }
    
                const usersData = JSON.parse(localStorage.getItem('users'));
                if (!usersData || !Array.isArray(usersData)) {
                    console.error('No user data found.');
                    return;
                }
    
                const activeUserData = usersData.find(user => user._id === activeUser.id);
                if (!activeUserData) {
                    console.error('Active user data not found.');
                    return;
                }
    
                const index = activeUserData.pkmnCatch.indexOf(this.pokemon._id);
                if (index === -1) {
                    activeUserData.pkmnCatch.push(this.pokemon._id);
                    if (!this.isPokemonSeen) {
                        activeUserData.pkmnSeen.push(this.pokemon._id);
                        this.isPokemonSeen = true;
                    }
                } else {
                    activeUserData.pkmnCatch.splice(index, 1);
                }
    
                localStorage.setItem('users', JSON.stringify(usersData));
                this.isPokemonCaught = !this.isPokemonCaught;
            },
            speakText() {
                // Créez un objet SpeechSynthesisUtterance avec le texte à lire
                const speech = new SpeechSynthesisUtterance(this.txt);
                speech.lang = 'en-US';

                // Utilisez l'API SpeechSynthesis pour lire le texte à voix haute
                window.speechSynthesis.speak(speech);
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
            },
            EditPokemon(){
                this.$router.push({ name: 'editPokemon' });
            },
            deletePokemon() {
        // Récupérer les Pokémon existants depuis le localStorage
        const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
        
        // Trouver l'index du Pokémon à supprimer dans le tableau
        const index = pokemons.findIndex(pokemon => pokemon._id === this.pokemon._id);
        
        if (index !== -1) {
            // Supprimer le Pokémon du tableau
            pokemons.splice(index, 1);
            
            // Mettre à jour les données dans le localStorage
            localStorage.setItem('pokemons', JSON.stringify(pokemons));
            
            // Parcourir tous les utilisateurs du localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.forEach(user => {
                // Retirer l'ID du Pokémon de la liste pkmnCatch s'il est présent
                const catchIndex = user.pkmnCatch.indexOf(this.pokemon._id);
                if (catchIndex !== -1) {
                    user.pkmnCatch.splice(catchIndex, 1);
                }
                
                // Retirer l'ID du Pokémon de la liste pkmnSeen s'il est présent
                const seenIndex = user.pkmnSeen.indexOf(this.pokemon._id);
                if (seenIndex !== -1) {
                    user.pkmnSeen.splice(seenIndex, 1);
                }
            });
            
            // Mettre à jour les données des utilisateurs dans le localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Redirection vers une page appropriée
            this.$router.push({ name: 'Home' });
        } else {
            console.error('Pokemon not found in localStorage.');
        }
    }
        },
        mounted() {
            document.title = 'Pokedex | ' + this.pokemon.name;
            this.txt = `${this.pokemon.name}, ${this.pokemon.types.join(" and ")} type Pokémon, ${this.pokemon.description}`;
            // Récupérer l'utilisateur actif du local storage
            const activeUser = JSON.parse(localStorage.getItem('ActiveUser'));
            if (!activeUser || !activeUser.id) {
                console.error('No active user found.');
                return;
            }

            // Récupérer les données des utilisateurs du local storage
            const usersData = JSON.parse(localStorage.getItem('users'));
            if (!usersData || !Array.isArray(usersData)) {
                console.error('No user data found.');
                return;
            }

            // Trouver l'objet utilisateur correspondant à l'utilisateur actif
            const activeUserData = usersData.find(user => user._id === activeUser.id);
            if (!activeUserData) {
                console.error('Active user data not found.');
                return;
            }

            // Vérifier si le Pokémon est déjà vu
            this.isPokemonSeen = activeUserData.pkmnSeen.includes(this.pokemon._id);

            // Vérifier si le Pokémon est déjà attrapé
            this.isPokemonCaught = activeUserData.pkmnCatch.includes(this.pokemon._id);
        },
        components: {
            PokemonType,
            PictoSeen,
            PictoCatch,
            PictoAudio,
            PictoPen,
            PictoBin,
            BurgerMenu
        },
        created() {
            this.checkAdminUser();
        }
    };
    </script>

    
    <style lang="sass" scoped>
    @import '/src/styles/main.sass'
    .container
        display: flex
        flex-wrap: wrap
        width: 100%
        min-height: 100vh
        padding: 3vw

        @media screen and (max-width: 1024px)
            flex-direction: column
        

    .media
        flex: 1 1 50%

        &-inner
            background-color: $light
            border-radius: 30px
            border: 3px grey solid
            width: 90%
            max-width: 500px
            padding: 1vw
            margin: auto
        img
            width: 100%
            max-width: 500px
            height: auto
        
        .parameters
            display: flex
            justify-content: center
            gap: 10px

        .checkboxContainer
            display: flex
            align-items: center
            justify-content: center

            .picto
                width: 30px

            input[type="checkbox"]
                width: 20px
                height: 20px

    .content
        flex: 1 1 50%
        font-family: $ff1
        height: 500px

        &-table
            border-collapse: collapse
            position: relative
            width: 100%

            .tools
                position: absolute
                top: 20px
                left: 20px
                display: flex
                flex-direction: row
                gap: 5px

            .btnTool
                display: block
                width: 30px
                height: 30px
                background-color: pink
                border: none
                border-radius: 10px
                padding: 5px

                &.isDelete
                    background-color: #f04e4e

                    &:hover
                        background-color: darken(#f04e4e,10%)

                &.isEdit
                    background-color: #42b883
                    
                    &:hover
                        background-color: darken(#42b883,10%)

        &-title
            border-radius: 10px 10px 5px 5px
            padding: 20px
            color: $light
            font-weight: bold
            font-size: 1.5em
            letter-spacing: 1px

        &-line
            td
                background: rgba(lighten($grass,41%), .65)
                padding: 20px

            &.firstRow
                td:first-of-type
                    border-radius: 5px 0 0 0
                td:last-of-type
                    border-radius: 0 5px 0 0

                &.oneColumn
                    td
                        border-radius: 5px 5px 0 0
                        padding: 0
                        span
                            border-end-start-radius: 0
                            border-end-end-radius: 0 
            &.lastRow
                td:first-of-type
                    border-radius: 0 0 0 5px
                td:last-of-type
                    border-radius: 0 0 5px 0
            &.aloneRow
                td:first-of-type
                    border-radius: 5px 0 0 5px
                td:last-of-type
                    border-radius: 0 5px 5px 0

        &-label
            span
                background: $light
                border-radius: 5px
                padding: 5px 15px
                width: 100%
                display: block
                text-align: center
        &-number
            text-align: center
        .separator
            height: 5px

        &-data
            .chipsContainer
                display: flex
                gap: 5px

        .readerBtn
            padding: 10px
            width: 40px
            height: 40px
            background-color: $light
            border: 1px solid grey
            border-radius: 5px
            .picto
                width: 100%

    #homeBtn
        position: absolute
        top: 0
        left: 0
        background-color: palevioletred
        text-decoration: none
        color: $light
        font-weight: bold
        padding: 5px
        font-family: sans-serif




    // Gestion des types, ne pas écrire après cette ligne pour ne pas perdre de lisibilité
    .container
        &.bug
            background: $bug-gradient
            .content
                &-title
                    background: $bug
                &-line
                    td
                        background: rgba(lighten($bug,41%), .65)

        &.dark
            background: $dark-gradient
            .content
                &-title
                    background: $dark
                &-line
                    td
                        background: rgba(lighten($dark,41%), .65)

        &.dragon
            background: $dragon-gradient
            .content
                &-title
                    background: $dragon
                &-line
                    td
                        background: rgba(lighten($dragon,41%), .65)

        &.electric
            background: $electric-gradient
            .content
                &-title
                    background: $electric
                &-line
                    td
                        background: rgba(lighten($electric,41%), .65)

        &.fairy
            background: $fairy-gradient
            .content
                &-title
                    background: $fairy
                &-line
                    td
                        background: rgba(lighten($fairy,41%), .65)

        &.fighting
            background: $fighting-gradient
            .content
                &-title
                    background: $fighting
                &-line
                    td
                        background: rgba(lighten($fighting,41%), .65)

        &.fire
            background: $fire-gradient
            .content
                &-title
                    background: $fire
                &-line
                    td
                        background: rgba(lighten($fire,41%), .65)

        &.flying
            background: $flying-gradient
            .content
                &-title
                    background: $flying
                &-line
                    td
                        background: rgba(lighten($flying,41%), .65)

        &.ghost
            background: $ghost-gradient
            .content
                &-title
                    background: $ghost
                &-line
                    td
                        background: rgba(lighten($ghost,41%), .65)

        &.normal
            background: $normal-gradient
            .content
                &-title
                    background: $normal
                &-line
                    td
                        background: rgba(lighten($normal,41%), .65)

        &.grass
            background: $grass-gradient
            .content
                &-title
                    background: $grass
                &-line
                    td
                        background: rgba(lighten($grass,41%), .65)

        &.ground
            background: $ground-gradient
            .content
                &-title
                    background: $ground
                &-line
                    td
                        background: rgba(lighten($ground,41%), .65)

        &.ice
            background: $ice-gradient
            .content
                &-title
                    background: $ice
                &-line
                    td
                        background: rgba(lighten($ice,41%), .65)

        &.poison
            background: $poison-gradient
            .content
                &-title
                    background: $poison
                &-line
                    td
                        background: rgba(lighten($poison,41%), .65)

        &.psychic
            background: $psychic-gradient
            .content
                &-title
                    background: $psychic
                &-line
                    td
                        background: rgba(lighten($psychic,41%), .65)

        &.rock
            background: $rock-gradient
            .content
                &-title
                    background: $rock
                &-line
                    td
                        background: rgba(lighten($rock,41%), .65)

        &.steel
            background: $steel-gradient
            .content
                &-title
                    background: $steel
                &-line
                    td
                        background: rgba(lighten($steel,41%), .65)

        &.water
            background: $water-gradient
            .content
                &-title
                    background: $water
                &-line
                    td
                        background: rgba(lighten($water,41%), .65)

    
    </style>
    