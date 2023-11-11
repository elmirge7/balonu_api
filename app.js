const express = require('express');
const {getUtilisateurs, getUtilisateur, createUtilisateur, deleteUtilisateur, updateUtilisateur} = require('./services/utilisateurs/utilisateurService')
const {getMontgolfieres, getMontgolfiere, createMontgolfiere, deleteMontgolfiere, updateMontgolfiere, getMontgolfieresByIdUtilisateur, deleteMontgolfieresByIdUtilisateur} = require('./services/montgolfieres/montgolfiereService')
const {getStands, getStand, createStand, deleteStand, updateStand, getStandsByIdUtilisateur,getStandsByIdEmplacement} = require("./services/stands/standService");


const app = express()

app.use(express.json());

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
    res.status(204); // Renvoie un statut 204 (No Content) pour indiquer que la suprression s'est bien passée
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
    await deleteMontgolfieresByIdUtilisateur(id);
    res.status(204);
})

// Modification d'une montgolfière
app.put('/montgolfieres/:id', async function (req, res){
    const id = req.params.id;
    const { nombre_place, libelle_montgolfiere, photo, id_utilisateur } = req.body;
    const montgolfiere = await updateMontgolfiere(nombre_place, libelle_montgolfiere, photo, id_utilisateur);
    res.send(montgolfiere);
})








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
    res.status(204).send(); // Renvoie un statut 204 (No Content) pour indiquer que la suppression s'est bien passée
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









app.listen(3000,() => {
    console.log('le serveur écoute sur le port 3000')
})