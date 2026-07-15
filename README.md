# Bot WhatsApp Ilios Pub

Ce projet contient le code d'un bot WhatsApp développé pour Ilios Pub, une entreprise spécialisée dans la publicité sur écrans numériques à Yaoundé, Cameroun. Le bot utilise l'API Cloud de WhatsApp Business (Meta Cloud API) avec Node.js et le framework Express.

## Fonctionnalités

Le bot est conçu pour fournir des réponses automatiques aux questions fréquentes des clients et les guider à travers les services d'Ilios Pub. Il inclut les fonctionnalités suivantes :

- Message de bienvenue interactif avec un menu numéroté.
- Réponses aux questions sur les services, tarifs, emplacements des écrans, spécifications des médias, moyens de paiement et horaires.
- Redirection vers un agent humain sur demande.
- Toutes les réponses sont en français.

## Informations sur l'entreprise (intégrées au bot)

| Catégorie             | Détail                                                              |
| :-------------------- | :------------------------------------------------------------------ |
| **Nom de l'entreprise** | Ilios Pub - Plateforme de gestion de publicité sur écrans numériques |
| **Adresse**           | Yaoundé, Cameroun                                                   |
| **Email**             | iliospub2@gmail.com                                                 |
| **Téléphone/WhatsApp**| +237 6 58 93 59 22                                                  |
| **Horaires**          | Lun - Ven / 8h-18h                                                  |
| **Prix**              | 4 500 FCFA                                                          |
| **Dimensions médias** | 1920 x 1080, ratio 16:9                                             |
| **Moyens de paiement**| Mobile Money (Orange Money, MTN Mobile Money) et Visa               |

**Emplacements des écrans à Yaoundé** :
- Biyem Assi
- Carrefour du Collège la retraite, en face bois Saint-Anastasie
- Warda, avant le Palais des Sports
- Total Mvan
- Avenue Jean Paul 2
- Wonderland Biyem-assi
- Stade du Lycée d'Etoug-Ebe
- Carrefour Market, Ekie
- Montée Education, Après les cascades du Mfoundi
- Tsinga
- Carrefour des carreaux, Brasseries du Cameroun
- Nouvelle route Bastos
- Melen
- Bastos, Elisabethan pressing, face Meumi Hotel
- Rond point Bastos
- Bata Nlongkak, face Kia Motors
- Tradex Bastos
- Ahala

## Fonctionnement du service Ilios Pub

1.  **Créer un compte** sur ilios-pub.com
2.  **Télécharger le contenu** (vidéo/image en 1920x1080, ratio 16:9)
3.  **Configurer la campagne**
4.  **Programmer la diffusion**
5.  **Payer** via Mobile Money ou Visa
6.  **Modération du contenu** (IA + vérification humaine)
7.  **Diffusion** sur les écrans
8.  **Suivi des performances**

## Configuration et Déploiement

### Prérequis

Assurez-vous d'avoir les éléments suivants :

-   Un compte développeur Meta Business.
-   Accès à l'API Cloud de WhatsApp Business.
-   Un numéro de téléphone WhatsApp Business enregistré.
-   Node.js (version 14 ou supérieure) et npm installés.

### Variables d'environnement

Créez un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example` et renseignez les informations suivantes :

```
WHATSAPP_TOKEN=VOTRE_TOKEN_API_CLOUD_WHATSAPP
VERIFY_TOKEN=VOTRE_TOKEN_DE_VERIFICATION_WEBHOOK
PHONE_NUMBER_ID=VOTRE_ID_DE_NUMERO_DE_TELEPHONE_WHATSAPP
PORT=3000
```

-   `WHATSAPP_TOKEN`: Le jeton d'accès temporaire ou permanent de l'API Cloud de WhatsApp Business. Vous pouvez le générer depuis votre tableau de bord développeur Meta.
-   `VERIFY_TOKEN`: Un jeton de vérification de votre choix. Il sera utilisé pour valider le webhook de Meta.
-   `PHONE_NUMBER_ID`: L'ID de votre numéro de téléphone WhatsApp Business, disponible dans votre tableau de bord développeur Meta.
-   `PORT`: Le port sur lequel le serveur Express écoutera. Par défaut, 3000.

### Installation

1.  Clonez ce dépôt ou téléchargez les fichiers du projet.
2.  Naviguez vers le répertoire du projet dans votre terminal :
    ```bash
    cd /home/ubuntu/bot_whatsapp
    ```
3.  Installez les dépendances :
    ```bash
    npm install
    ```

### Lancement du bot

Pour démarrer le bot en mode production :

```bash
npm start
```

Pour démarrer le bot en mode développement (avec `nodemon` pour le rechargement automatique) :

```bash
npm run dev
```

Le serveur écoutera sur le port spécifié (par défaut 3000).

### Configuration du Webhook Meta

1.  Dans votre tableau de bord développeur Meta, accédez à la section de l'API WhatsApp Business.
2.  Configurez un webhook avec l'URL de votre serveur (par exemple, `https://votre-domaine.com/webhook`). Si vous testez localement, vous devrez utiliser un outil comme `ngrok` pour exposer votre serveur local à Internet.
3.  Utilisez le `VERIFY_TOKEN` que vous avez défini dans votre fichier `.env` pour la vérification du webhook.
4.  Abonnez-vous aux événements `messages` pour recevoir les messages entrants.

## Utilisation

Une fois le bot déployé et le webhook configuré, les utilisateurs peuvent envoyer un message à votre numéro WhatsApp Business. Le bot répondra avec le menu principal et traitera les requêtes en fonction des options choisies.

## Technologies utilisées

-   Node.js
-   Express.js
-   Axios (pour les requêtes HTTP)
-   Dotenv (pour la gestion des variables d'environnement)

---

**Auteur** : Manus AI
**Date** : 15 juillet 2026
