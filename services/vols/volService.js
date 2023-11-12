const pool = require('../../config/db');

// Récupérer touts les vols
function getVols() {
    return pool.query("SELECT * FROM vol").then(([rows]) => rows);
}

// Récupérer un vol en fonction de son ID, de l'utilisateur et de lhorraire
function getVol(id_utilisateur, id_montgolfiere, id_horaire_vol) {
    return pool.query("SELECT * FROM vol WHERE id_utilisateur = ? AND id_montgolfiere = ? AND id_horaire_vol = ?", [id_utilisateur, id_montgolfiere, id_horaire_vol]).then(([rows]) => rows[0]);
}

// Créer un nouveau vol
function createVol(id_utilisateur, id_montgolfiere, id_horaire_vol, prix_vol, libelle_vol) {
    return pool.query("INSERT INTO vol (id_utilisateur, id_montgolfiere, id_horaire_vol, prix_vol, libelle_vol) VALUES (?, ?, ?, ?, ?)", [id_utilisateur, id_montgolfiere, id_horaire_vol, prix_vol, libelle_vol])
        .then(([result]) => getVol(id_utilisateur, id_montgolfiere, id_horaire_vol));
}

// Supprimer un vol
function deleteVol(id_utilisateur, id_montgolfiere, id_horaire_vol) {
    return pool.query("DELETE FROM vol WHERE id_utilisateur = ? AND id_montgolfiere = ? AND id_horaire_vol = ?", [id_utilisateur, id_montgolfiere, id_horaire_vol]);
}

// Récupérer tout les vols d'un utilisateur
function getAllVolsForUtilisateur(id_utilisateur) {
    return pool.query("SELECT * FROM vol WHERE id_utilisateur = ?", [id_utilisateur]).then(([rows]) => rows[0]);
}

// Récupérer tout les vols d'une mongolfiere
function getAllVolsForMontgolfiere(id_montgolfiere) {
    return pool.query("SELECT * FROM vol WHERE id_montgolfiere = ?", [id_montgolfiere]).then(([rows]) => rows[0]);
}

// Récupérer tout les vols d'un horaire
function getAllVolsForHoraireVol(id_horaire_vol) {
    return pool.query("SELECT * FROM vol WHERE id_horaire_vol = ?", [id_horaire_vol]).then(([rows]) => rows[0]);
}

module.exports = {
    getVols,
    getVol,
    createVol,
    deleteVol,
    getAllVolsForUtilisateur,
    getAllVolsForMontgolfiere,
    getAllVolsForHoraireVol
};
