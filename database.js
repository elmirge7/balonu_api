const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
}).promise()

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

module.exports = {
    getUtilisateurs,
    getUtilisateur,
    createUtilisateur,
};