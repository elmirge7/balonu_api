const express = require('express');
const {getUtilisateurs, getUtilisateur, createUtilisateur, deleteUtilisateur, updateUtilisateur} = require('./services/utilisateurs/utilisateurService')
const {getMontgolfieres, getMontgolfiere, createMontgolfiere, deleteMontgolfiere, updateMontgolfiere, getMontgolfieresByIdUtilisateur, deleteMontgolfieresByIdUtilisateur} = require('./services/montgolfieres/montgolfiereService')
const {getStands, getStand, createStand, deleteStand,deleteStandsByIdUtilisateur, updateStand, getStandsByIdUtilisateur,getStandsByIdEmplacement} = require("./services/stands/standService");
const {getProduits, getProduit, createProduit, deleteProduit, updateProduit} = require("./services/produits/produitService");
const {getCouleurs, getCouleur, createCouleur, deleteCouleur, updateCouleur} = require('./services/couleurs/couleurService');
const {getEmplacements,getEmplacement, createEmplacement, deleteEmplacement, updateEmplacement} = require('./services/emplacements/emplacementService');
const {getHorairesVol, getHoraireVol, createHoraireVol, deleteHoraireVol, updateHoraireVol} = require('./services/horairesVol/horaireVolService');
const {getVentes, createVente, deleteVente, getAllVentesForStand, getAllVentesForProduit} = require('./services/vends/vendService');
const {getAssociations, getAssociation, createAssociation, deleteAssociation, getAllAssociationsForMontgolfiere, getAllAssociationsForCouleur} = require('./services/est/estService');
const {getVols,getVol, createVol, deleteVol, getAllVolsForUtilisateur, getAllVolsForMontgolfiere, getAllVolsForHoraireVol} = require('./services/vols/volService');


const app = express()

app.use(express.json());



// Routes concernant les utilisateurs
app.get('/utilisateurs', async function (req, res) {
    const utilisateurs = await getUtilisateurs();
    res.send(utilisateurs);
})

app.get('/utilisateurs/:id', async function (req, res) {
    const id = req.params.id;
    const utilisateur = await getUtilisateur(id);
    res.send(utilisateur);
})

app.post('/utilisateurs', async function (req, res){
    const {login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire} = req.body
    const utilisateur = await createUtilisateur(login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire);
    res.status(201).send(utilisateur);
})

// Route pour supprimer un utilisateur
// A compléter quand on aura les montgolfières de faites pour montrer la liste que l'on a besoin de supprimer avant de supprimer l'user
app.delete('/utilisateurs/:id', async function (req,res){
    const id = req.params.id;
    await deleteMontgolfieresByIdUtilisateur(id);
    await deleteUtilisateur(id);
    res.status(204).send; // Renvoie un statut 204 (No Content) pour indiquer que la suprression s'est bien passee
})

// Route pour mettre à jour un utilisateur par rapport à son ID
app.put('/utilisateurs/:id', async (req, res) => {
    const id = req.params.id;
    const { login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire } = req.body;
    const utilisateur = await updateUtilisateur(id, login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire);
    res.send(utilisateur);
})








// Routes qui concernent les montgolfières
// Accès à toutes les montgolfières
app.get('/montgolfieres', async function (req, res) {
    const montgolfieres = await getMontgolfieres();
    res.send(montgolfieres);
})

// Accès à une montgolfière en fonction de son ID

app.get('/montgolfieres/:id', async function (req, res){
    const id = req.params.id;
    const montgolfiere = await getMontgolfiere(id);
    res.send(montgolfiere);
})

// Accès aux montgolfières en fonction de l'id d'un utilisateur
app.get('/utilisateurs/:id/montgolfieres', async function (req, res){
    const id_utilisateur = req.params.id;
    const montgolfieres = await getMontgolfieresByIdUtilisateur(id_utilisateur);
    res.send(montgolfieres);
})


// Création d'une montgolfière
app.post('/montgolfieres', async function (req, res){
    const {nombre_place, libelle_montgolfiere, photo, id_utilisateur} = req.body;
    const montgolfiere = await createMontgolfiere(nombre_place, libelle_montgolfiere, photo, id_utilisateur);
    res.status(201).send(montgolfiere)
})

// Suppression d'une montgolfière
app.delete('/montgolfieres/:id', async function (req, res){
    const id = req.params.id;
    await deleteMontgolfiere(id);
    res.status(204);
})

// Suppression de toutes les montgolfieres d'un ID d'utilisateur
app.delete('/utilisateurs/:id/montgolfieres', async function (req, res){
    const id = req.params.id;
    // Vérifie si des montgolfieres sont associees à l'utilisateur avant de les supprimer
    const montgolfieres = await getMontgolfieresByIdUtilisateur(id);
    if (montgolfieres.length > 0) {
        await deleteMontgolfieresByIdUtilisateur(id);
        res.status(204).send();
    } else {
        res.status(404).send("Aucune montgolfière associée à cet utilisateur.");
    }
});

// Modification d'une montgolfière
app.put('/montgolfieres/:id', async function (req, res){
    const id = req.params.id;
    const { nombre_place, libelle_montgolfiere, photo, id_utilisateur } = req.body;
    const montgolfiere = await updateMontgolfiere(id,nombre_place, libelle_montgolfiere, photo, id_utilisateur);
    res.send(montgolfiere);
})






// Routes concernant les emplacements
// Route pour recuperer tous les emplacements
app.get('/emplacements', async function (req, res) {
    const emplacements = await getEmplacements();
    res.send(emplacements);
});

// Route pour récupérer un emplacement par son ID
app.get('/emplacements/:id', async function (req, res) {
    const id = req.params.id;
    const emplacement = await getEmplacement(id);
    res.send(emplacement);
});

// Route pour créer un nouvel emplacement
app.post('/emplacements', async function (req, res) {
    const { libelle_emplacement } = req.body;
    const emplacement = await createEmplacement(libelle_emplacement);
    res.status(201).send(emplacement);
});

// Route pour supprimer un emplacement par son ID
app.delete('/emplacements/:id', async function (req, res) {
    const id = req.params.id;
    await deleteEmplacement(id);
    res.status(204).send();
});

// Route pour mettre à jour un emplacement par son ID
app.put('/emplacements/:id', async function (req, res) {
    const id = req.params.id;
    const { libelle_emplacement } = req.body;
    const emplacement = await updateEmplacement(id, libelle_emplacement);
    res.send(emplacement);
});







// Routes concernant les stands
// Accès à tous les stands
app.get('/stands', async function (req, res) {
    const stands = await getStands();
    res.send(stands);
});

// Accès à un stand en fonction de son ID
app.get('/stands/:id', async function (req, res) {
    const id = req.params.id;
    const stand = await getStand(id);
    res.send(stand);
});

// Création d'un nouveau stand
app.post('/stands', async function (req, res) {
    const { libelle_stand, id_emplacement, id_utilisateur } = req.body;
    const stand = await createStand(libelle_stand, id_emplacement, id_utilisateur);
    res.status(201).send(stand);
});

// Suppression d'un stand par son ID
app.delete('/stands/:id', async function (req, res) {
    const id = req.params.id;
    await deleteStand(id);
    res.status(204).send();
});

// Suppression de tous les stands d'un ID d'utilisateur
app.delete('/utilisateurs/:id/stands', async function (req, res){
    const id = req.params.id;
    // Vérifie si des stands sont associés à l'utilisateur avant de les supprimer
    const stands = await getStandsByIdUtilisateur(id);
    if (stands.length > 0) {
        await deleteStandsByIdUtilisateur(id);
        res.status(204).send();
    } else {
        res.status(404).send("Aucun stand associé à cet utilisateur.");
    }
});


// Mise à jour d'un stand par son ID
app.put('/stands/:id', async function (req, res) {
    const id = req.params.id;
    const { libelle_stand, id_emplacement, id_utilisateur } = req.body;
    const stand = await updateStand(id, libelle_stand, id_emplacement, id_utilisateur);
    res.send(stand);
});

// Accès aux stands en fonction de l'id d'un utilisateur
app.get('/utilisateurs/:id/stands', async function (req, res){
    const id_utilisateur = req.params.id;
    const stands = await getStandsByIdUtilisateur(id_utilisateur);
    res.send(stands);
});

// Accès aux stands en fonction de l'id d'un emplacement
app.get('/emplacements/:id/stands', async function (req, res) {
    const id_emplacement = req.params.id;
    const stands = await getStandsByIdEmplacement(id_emplacement);
    res.send(stands);
});








// Routes concernant les produits
// Accès à tous les produits
app.get('/produits', async function (req, res) {
    const produits = await getProduits();
    res.send(produits);
});

// Accès à un produit en fonction de son ID
app.get('/produits/:id', async function (req, res) {
    const id = req.params.id;
    const produit = await getProduit(id);
    res.send(produit);
});

// Création d'un nouveau produit
app.post('/produits', async function (req, res) {
    const { libelle_produit, id_emplacement, id_utilisateur } = req.body;
    const produit = await createProduit(libelle_produit, id_emplacement, id_utilisateur);
    res.status(201).send(produit);
});

// Suppression d'un produit par son ID
app.delete('/produits/:id', async function (req, res) {
    const id = req.params.id;
    await deleteProduit(id);
    res.status(204).send();
});

// Mise à jour d'un stand par son ID
app.put('/produits/:id', async function (req, res) {
    const id = req.params.id;
    const { libelle_produit, id_emplacement, id_utilisateur } = req.body;
    const produit = await updateProduit(id, libelle_produit, id_emplacement, id_utilisateur);
    res.send(produit);
});







// Routes concernant les couleurs
// Route pour récupérer toutes les couleurs
app.get('/couleurs', async function (req, res) {
    const couleurs = await getCouleurs();
    res.send(couleurs);
});

// Route pour récupérer une couleur par son ID
app.get('/couleurs/:id', async function (req, res) {
    const id = req.params.id;
    const couleur = await getCouleur(id);
    res.send(couleur);
});

// Route pour créer une nouvelle couleur
app.post('/couleurs', async function (req, res) {
    const { libelle_couleur } = req.body;
    const couleur = await createCouleur(libelle_couleur);
    res.status(201).send(couleur);
});


// Route pour supprimer une couleur par son ID
app.delete('/couleurs/:id', async function (req, res) {
    const id = req.params.id;
    await deleteCouleur(id);
    res.status(204).send();
});
// Mise à jour d'une couleur par son ID
app.put('/couleurs/:id', async function (req, res) {
    const id = req.params.id;
    const { libelle_couleur } = req.body;
    const couleur = await updateCouleur(id, libelle_couleur);
    res.send(couleur);
});








// Routes concernant les couleurs
// Route pour récupérer toutes les horraires_vols
app.get('/horairesVol', async function (req, res) {
    const horairesVol = await getHorairesVol();
    res.send(horairesVol);
});

// Route pour récupérer un horaire de vol par son ID
app.get('/horairesVol/:id', async function (req, res) {
    const id = req.params.id;
    const horaireVol = await getHoraireVol(id);
    res.send(horaireVol);
});

// Route pour créer un nouvel horaire de vol
app.post('/horairesVol', async function (req, res) {
    const { date_vol, horaire_vol } = req.body;
    const horaireVol = await createHoraireVol(date_vol, horaire_vol);
    res.status(201).send(horaireVol);
});

// Route pour supprimer un horaire de vol par son ID
app.delete('/horairesVol/:id', async function (req, res) {
    const id = req.params.id;
    await deleteHoraireVol(id);
    res.status(204).send();
});

// Route pour mettre à jour un horaire de vol par son ID
app.put('/horairesVol/:id', async function (req, res) {
    const id = req.params.id;
    const { date_vol, horaire_vol } = req.body;
    const horaireVol = await updateHoraireVol(id, date_vol, horaire_vol);
    res.send(horaireVol);
});







// Routes concernant les ventes
// Route pour récupérer toutes les ventes
app.get('/ventes', async function (req, res) {
    const ventes = await getVentes();
    res.send(ventes);
});
// Route pour créer une vente
app.post('/ventes', async function (req, res) {
    const { id_stand, id_produit, prix_produit } = req.body;
    await createVente(id_stand, id_produit, prix_produit);
    res.status(201).send('Vente créée avec succès.');
});

// Route pour supprimer une vente
app.delete('/ventes/:id_stand/:id_produit', async function (req, res) {
    const { id_stand, id_produit } = req.params;
    await deleteVente(id_stand, id_produit);
    res.status(204).send();
});

// Route pour récupérer toutes les ventes pour un stand spécifique
app.get('/ventes/stand/:id_stand', async function (req, res) {
    const { id_stand } = req.params;
    const ventes = await getAllVentesForStand(id_stand);
    res.send(ventes);
});

// Route pour récupérer toutes les ventes pour un produit spécifique
app.get('/ventes/produit/:id_produit', async function (req, res) {
    const { id_produit } = req.params;
    const ventes = await getAllVentesForProduit(id_produit);
    res.send(ventes);
});








// Routes concernant les couleurs
// Route pour récupérer toutes les associations
app.get('/est', async function (req, res) {
    const associations = await getAssociations();
    res.send(associations);
});

// Route pour récupérer une association en fonction d'une montgolfiere et une couleur
app.get('/est/:id_montgolfiere/:id_couleur', async function (req, res) {
    const { id_montgolfiere, id_couleur } = req.params;
    const association = await getAssociation(id_montgolfiere, id_couleur);
    res.send(association);
});

// Route pour créer une association entre une montgolfière et une couleur
app.post('/est', async function (req, res) {
    const { id_montgolfiere, id_couleur } = req.body;
    const newAssociation = await createAssociation(id_montgolfiere, id_couleur);
    res.status(201).send(newAssociation);
});

// Route pour supprimer une association entre une montgolfière et une couleur
app.delete('/est/:id_montgolfiere/:id_couleur', async function (req, res) {
    const { id_montgolfiere, id_couleur } = req.params;
    await deleteAssociation(id_montgolfiere, id_couleur);
    res.status(204).send();
});


// Pas sur que ca marche
// Route pour récupérer toutes les associations pour une montgolfière spécifique
app.get('/est/montgolfiere/:id_montgolfiere', async function (req, res) {
    const { id_montgolfiere } = req.params;
    const associations = await getAllAssociationsForMontgolfiere(id_montgolfiere);
    res.send(associations);
});

// Route pour récupérer toutes les associations pour une couleur spécifique
app.get('/est/couleur/:id_couleur', async function (req, res) {
    const { id_couleur } = req.params;
    const associations = await getAllAssociationsForCouleur(id_couleur);
    res.send(associations);
});











// Routes concernant les vols
// Accès à touts les vols
app.get('/vols', async function (req, res) {
    const vols = await getVols();
    res.send(vols);
})

// Route pour récupérer un vol par un utilisateur, une montgolfière et un horaire de vol spécifiques

app.get('/vols/:id_utilisateur/:id_montgolfiere/:id_horaire_vol', async function (req, res) {
    const { id_utilisateur, id_montgolfiere, id_horaire_vol } = req.params;
    const vol = await getVol(id_utilisateur, id_montgolfiere, id_horaire_vol);
    res.send(vol);
});

// Route pour créer un vol
app.post('/vols', async function (req, res) {
    const { id_utilisateur, id_montgolfiere, id_horaire_vol, prix_vol, libelle_vol } = req.body;
    const newVol = await createVol(id_utilisateur, id_montgolfiere, id_horaire_vol, prix_vol, libelle_vol);
    res.status(201).send(newVol);
});

// Route pour supprimer un vol
app.delete('/vols/:id_utilisateur/:id_montgolfiere/:id_horaire_vol', async function (req, res) {
    const { id_utilisateur, id_montgolfiere, id_horaire_vol } = req.params;
    await deleteVol(id_utilisateur, id_montgolfiere, id_horaire_vol);
    res.status(204).send();
});

// Route pour récupérer tous les vols d'un utilisateur spécifique
app.get('/vols/utilisateur/:id_utilisateur', async function (req, res) {
    const { id_utilisateur } = req.params;
    const vols = await getAllVolsForUtilisateur(id_utilisateur);
    res.send(vols);
});

// Route pour récupérer tous les vols d'une montgolfière spécifique
app.get('/vols/montgolfiere/:id_montgolfiere', async function (req, res) {
    const { id_montgolfiere } = req.params;
    const vols = await getAllVolsForMontgolfiere(id_montgolfiere);
    res.send(vols);
});

// Route pour récupérer tous les vols pour un horaire de vol spécifique
app.get('/vols/horaire/:id_horaire_vol', async function (req, res) {
    const { id_horaire_vol } = req.params;
    const vols = await getAllVolsForHoraireVol(id_horaire_vol);
    res.send(vols);
});















app.listen(3000,() => {
    console.log('le serveur écoute sur le port 3000')
})