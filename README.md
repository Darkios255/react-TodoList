# TodoApp - Gestionnaire de Tâches React Native

Application mobile de gestion de tâches (Todo List) réalisée dans le cadre du contrôle continu du module "Programmation d'applications client" (SINFL5C1).

Cette application permet aux utilisateurs de créer des listes de tâches, de gérer leur avancement et de synchroniser les données via une API GraphQL.

## Fonctionnalités

### Fonctionnalités Principales
* **Authentification** : Inscription (Sign Up) et Connexion (Sign In) sécurisées via Token JWT.
* **Gestion des Listes** : Créer et supprimer des listes de tâches.
* **Gestion des Tâches** : Ajouter, cocher/décocher et supprimer des tâches au sein d'une liste.
* **Filtrage** : Affichage dynamique des tâches (Toutes, Actives, Complétées).
* **Navigation** : Navigation fluide via onglets (Tab) et piles (Stack).

### Fonctionnalités Avancées (Bonus)
* **Barre de Progression** : Visualisation graphique de l'avancement d'une liste.
* **Actions de Masse** : Possibilité de tout cocher ou tout décocher en un clic.
* **Export et Partage** : Exportation du contenu d'une liste au format texte (via le partage natif du téléphone ou le presse-papier).
* **Administration du Compte** : Possibilité pour l'utilisateur de supprimer son compte et toutes ses données associées.

## Technologies utilisées

* **React Native** / **Expo**
* **React Navigation** (Bottom Tabs & Native Stack)
* **Context API** (Gestion globale de l'état : Token & Username)
* **GraphQL** (Communication avec l'API backend)
* **Hooks** (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`)

## Installation et Lancement

1.  **Prérequis** : Assurez-vous d'avoir Node.js installé.

2.  **Installation des dépendances** :
    À la racine du projet, exécutez :
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Lancement de l'application** :
    ```bash
    npx expo start
    ```
    * Appuyez sur `a` pour lancer sur Android Emulator.
    * Appuyez sur `i` pour lancer sur iOS Simulator.
    * Appuyez sur `w` pour lancer dans le navigateur web.
    * Ou scannez le QR code avec l'application **Expo Go** sur votre téléphone physique.

## fY Structure du Projet

* `App.js` : Point d'entrée, gestion des Context Providers.
* `/Navigation` : Configuration de la navigation (TabNavigator, StackNavigator).
* `/Screen` : Les écrans principaux (Login, Home, Listes, Détails).
* `/components` :
    * `/API` : Fonctions de communication avec l'API GraphQL (Fetch).
    * `/ItemIn` : Composants UI internes aux listes (Item, ProgressBar, Header).
    * `/ItemOut` : Composants UI pour l'affichage des listes.
* `/Context` : Définition des contextes (Token, Username).
* `styles.js` : Feuille de style centralisée.

## Auteurs

* AUBERT Paul - 22205603
* SIAGHI Massinissa - 22312276

---
*Projet réalisé pour l'université de Caen Normandie (UNICAEN) - 2025/2026*