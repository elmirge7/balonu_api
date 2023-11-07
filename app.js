const express = require('express');
const {getUtilisateurs, getUtilisateur, createUtilisateur, deleteUtilisateur, updateUtilisateur} = require('./services/utilisateurs/utilisateurService')

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


app.listen(3000,() => {
    console.log('le serveur écoute sur le port 3000')
})