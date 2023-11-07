const pool = require('../../config/db');

function getUtilisateurs() {
    return pool.query("SELECT * FROM utilisateur").then(([rows]) => rows);
}

function getUtilisateur(id) {
    return pool.query("SELECT * FROM utilisateur WHERE id_utilisateur = ?", [id]).then(([rows]) => rows[0]);
}

function createUtilisateur(login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire) {
    return pool.query("INSERT INTO utilisateur (login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire])
        .then(([result]) => getUtilisateur(result.insertId));
}

function deleteUtilisateur(id_utilisateur) {
    return pool.query("DELETE FROM utilisateur WHERE id_utilisateur = ?", [id_utilisateur]);
}

function updateUtilisateur(id_utilisateur, login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire){
    return pool.query("UPDATE utilisateur SET login_utilisateur = ?, mot_de_passe_utilisateur = ?, nom_utilisateur = ?, prenom_utilisateur = ?, mail_utilisateur = ?, adresse_utilisateur = ?, telephone_utilisateur = ?, est_admin = ?, est_montgolfier = ?, est_prestataire = ? WHERE id_utilisateur = ?", [login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire, id_utilisateur])
        .then(([result]) => getUtilisateur(id_utilisateur));
}

module.exports = {
    getUtilisateurs,
    getUtilisateur,
    createUtilisateur,
    deleteUtilisateur,
    updateUtilisateur
};