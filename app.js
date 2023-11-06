const express = require('express');
const {getUtilisateurs, getUtilisateur, createUtilisateur} = require('./database')

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


app.listen(3000,() => {
    console.log('le serveur écoute sur le port 3000')
})