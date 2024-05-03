# Projet Pokédex: Front End

Auteur: Alexandre Bellet   
Groupe: MMI3 - DWDI

---

😎 **Explication :**

Le projet a été prévu pour fonctionner aussi bien en local que sur GitHub Pages en utilisant le local storage. En d'autres termes, il n'y a aucune différence entre les deux environnements.

---

🔧 **Tirer en local :**

Récupérer les dépendances :

```
npm install
```

Ouvrir le serveur :

```
npm run serve
```


---

🚀 **Mise en place sur GitHub Pages :**

J'ai mis en place un workflow GitHub Actions pour que lorsqu'un push est effectué sur main, le projet se construise automatiquement sur la branche gh-pages.

---

🔐 **Identifiants des comptes existants :**

Deux comptes sont déjà créés pour pouvoir naviguer sur le projet :

- Un compte utilisateur simple :
  - Login: toto
  - MDP: toto

- Un administrateur :
  - Login: admin
  - MDP: admin
  Celui-ci a la possibilité de créer, supprimer et modifier des Pokémon contrairement aux autres utilisateurs. L'option pour créer un nouveau Pokémon se trouve dans le menu burger tandis que la modification et la suppression se trouvent sur la page de détails du Pokémon.

Vous pouvez créer des utilisateurs à votre guise, cependant, ils ne pourront pas être administrateurs.

---

🔗 **Lien du site sur GitHub Pages :**

[Projet Pokédex Front](https://xelamp4.github.io/pokedex-front/)

---

🛣️ **Les routes :**

Elles sont protégées et gèrent les redirections en fonction du rôle et de l'état de connexion de l'utilisateur.

---

👾 **Les Pokémons :**

Pas besoin de peupler la BDD, la première génération de Pokémon est déjà présente malgré une petite coquille au niveau d'Ectoplasma.

---

💡 **Infos supplémentaires :**

Lorsque vous choisissez de voir les Pokémon vus dans les filtres, vous verrez apparaître aussi les Pokémon attrapés. Ce n'est pas un bug, c'est la logique que j'ai décidé d'adopter, un Pokémon attrapé a forcément été vu ! (comme sur les jeux, du moins ceux auxquels j'ai joué).

![it's a feature](https://y.yarn.co/71cd02be-f96a-47a1-8d8f-84ea5dff4b71_text.gif)


Par manque de temps, je n'ai pas eu le temps d'intégrer de filtre pour les régions. Je n'ai pas non plus géré de confirmation à la suppression ou à la modification d'un Pokémon ou d'un utilisateur.
