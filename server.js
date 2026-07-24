const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

// Informations de l'entreprise
const COMPANY_INFO = {
    name: "Ilios Pub",
    address: "Yaoundé, Cameroun",
    email: "iliospub2@gmail.com",
    phone: "+237 6 58 93 59 22",
    hours: "Lun - Ven / 8h-18h",
    price: "4 500 FCFA",
    media_dimensions: "1920 x 1080, ratio 16:9",
    payment_methods: "Mobile Money (Orange Money, MTN Mobile Money) et Visa",
    locations: [
        "Biyem Assi", "Carrefour du Collège la retraite", "Warda", "Total Mvan",
        "Avenue Jean Paul 2", "Wonderland Biyem-assi", "Stade du Lycée d'Etoug-Ebe",
        "Carrefour Market, Ekie", "Montée Education", "Tsinga", "Carrefour des carreaux",
        "Nouvelle route Bastos", "Melen", "Bastos (Meumi Hotel)", "Rond point Bastos",
        "Bata Nlongkak", "Tradex Bastos", "Ahala"
    ]
};

// Menu principal
const getMainMenu = () => {
    return `🌟 *Bienvenue chez ${COMPANY_INFO.name}* 🌟\n\n` +
           `Votre partenaire de publicité numérique à Yaoundé.\n\n` +
           `Comment pouvons-nous vous aider ?\n` +
           `1️⃣ Nos Services\n` +
           `2️⃣ Tarifs & Paiement\n` +
           `3️⃣ Emplacements des écrans\n` +
           `4️⃣ Spécifications techniques\n` +
           `5️⃣ Comment ça marche ?\n` +
           `6️⃣ Politique d'annulation\n` +
           `7️⃣ Contact & Horaires\n` +
           `8️⃣ Parler à un agent humain\n\n` +
           `*Répondez avec le numéro de votre choix.*`;
};

// Gestion des réponses
const getResponse = (text) => {
    const input = text.trim();

    switch(input) {
        case '1':
            return `📺 *Nos Services*\n\nDiffusion de vidéos et images publicitaires sur un réseau d'écrans numériques. Nous offrons une création et gestion de campagnes via notre interface web/mobile avec une programmation flexible.`;
        case '2':
            return `💰 *Tarifs & Paiement*\n\n- *Prix* : ${COMPANY_INFO.price}\n- *Moyens de paiement* : ${COMPANY_INFO.payment_methods}`;
        case '3':
            return `📍 *Emplacements à Yaoundé*\n\nNos écrans sont situés à :\n- ${COMPANY_INFO.locations.join('\n- ')}`;
        case '4':
            return `📐 *Spécifications Médias*\n\nPour une qualité optimale, vos contenus doivent respecter :\n- *Dimensions* : ${COMPANY_INFO.media_dimensions}\n- *Format* : Vidéo ou Image haute résolution.`;
        case '5':
            return `🚀 *Comment ça marche ?*\n\n1. Créez un compte sur *ilios-pub.com*\n2. Téléchargez votre contenu (1920x1080)\n3. Configurez votre campagne\n4. Programmez la diffusion\n5. Payez via Mobile Money ou Visa\n6. Modération (IA + Humaine)\n7. Diffusion & Suivi des performances`;
        case '6':
            return `⚠️ *Politique d'annulation*\n\nAnnulation possible avant validation/modération. Après le début de la diffusion, aucun remboursement n'est possible sauf incident majeur imputable à Ilios Pub.`;
        case '7':
            return `📞 *Contact & Horaires*\n\n- *Adresse* : ${COMPANY_INFO.address}\n- *Email* : ${COMPANY_INFO.email}\n- *WhatsApp* : ${COMPANY_INFO.phone}\n- *Horaires* : ${COMPANY_INFO.hours}`;
        case '8':
            return `🤝 *Agent Humain*\n\nUn de nos conseillers va vous répondre sous peu. Vous pouvez aussi nous appeler directement au ${COMPANY_INFO.phone}.`;
        default:
            return getMainMenu();
    }
};

// Webhook Verification (pour Meta)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // --- LOGS DE DEBUG TEMPORAIRES : à retirer une fois le problème résolu ---
    console.log('--- Tentative de vérification webhook ---');
    console.log('mode reçu       :', JSON.stringify(mode));
    console.log('token reçu      :', JSON.stringify(token), '(longueur:', token ? token.length : 0, ')');
    console.log('token attendu   :', JSON.stringify(VERIFY_TOKEN), '(longueur:', VERIFY_TOKEN ? VERIFY_TOKEN.length : 0, ')');
    console.log('tokens identiques ?', token === VERIFY_TOKEN);
    // --- FIN LOGS DE DEBUG ---

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
});

// Réception des messages
app.post('/webhook', async (req, res) => {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
        if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0]) {
            const msg = body.entry[0].changes[0].value.messages[0];
            const from = msg.from; // ID de l'expéditeur
            const msgText = msg.text ? msg.text.body : "";

            const responseText = getResponse(msgText);

            try {
                await axios({
                    method: "POST",
                    url: `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
                    data: {
                        messaging_product: "whatsapp",
                        to: from,
                        text: { body: responseText },
                    },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                    },
                });
            } catch (error) {
                console.error("Error sending message:", error.response ? error.response.data : error.message);
            }
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.get('/', (req, res) => {
    res.send('Ilios Pub WhatsApp Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
