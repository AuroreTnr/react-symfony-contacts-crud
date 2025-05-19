# Projet API Contact (React + Symfony)

Ce projet est une application simple de gestion de contacts, développée avec **React** pour le front-end et **Symfony + API Platform** pour le back-end.

## 🔧 Fonctionnalités

- Ajouter un contact
- Modifier un contact
- Supprimer un contact
- Rechercher un contact par nom ou prénom (côté client)
- Validation des champs (email, nom, prénom)
- API Platform

## 🛠️ Technologies utilisées

- **Front-end** : React, Bootstrap
- **Back-end** : Symfony 6, API Platform, Doctrine ORM

## 🚀 Lancer le projet

### Back-end (Symfony)

```bash
git clone <repo-url>
cd microApi
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
symfony server:start

```

### Front-end (React)

```bash
cd react-front
npm install
npm run dev
```


## 📁 Structure

* microApi/ : projet Symfony

* react-front/ : projet React




## 🔐 Sécurité

⚠️ Ce projet est une démonstration simple et **ne comporte pas encore de système d'authentification ou de sécurité**.



### 🧩 Interface admin

Ce projet n' utilise pas la bibliothèque React Admin. L’interface d’administration (CRUD) a été construite à la main en React pour une meilleure compréhension du fonctionnement des appels API, des formulaires et de la gestion d’état.




