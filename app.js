const express = require('express');
const {getUtilisateurs, getUtilisateur, createUtilisateur, deleteUtilisateur, updateUtilisateur} = require('./services/utilisateurs/utilisateurService')
const {getMontgolfieres, getMontgolfiere, createMontgolfiere, deleteMontgolfiere, updateMontgolfiere, getMontgolfieresByIdUtilisateur, deleteMontgolfieresByIdUtilisateur} = require('./services/montgolfieres/montgolfiereService')

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



app.listen(3000,() => {
    console.log('le serveur écoute sur le port 3000')
})