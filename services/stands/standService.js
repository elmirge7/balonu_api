const pool = require('../../config/db');

// Récupérer tous les stands
function getStands() {
    return pool.query("SELECT * FROM stand").then(([rows]) => rows);
}

// Récupérer un stand en fonction de son ID
function getStand(id) {
    return pool.query("SELECT * FROM stand WHERE id_stand = ?", [id]).then(([rows]) => rows[0]);
}

// Créer un nouveau stand
function createStand(libelle_stand, id_emplacement, id_utilisateur) {
    return pool.query("INSERT INTO stand (libelle_stand, id_emplacement, id_utilisateur) VALUES (?, ?, ?)", [libelle_stand, id_emplacement, id_utilisateur])
        .then(([result]) => getStand(result.insertId));
}

// Supprimer un stand en fonction de son ID
function deleteStand(id_stand) {
    return pool.query("DELETE FROM stand WHERE id_stand = ?", [id_stand]);
}

// Supprimer toutes les Stands d'un utilisateur
function deleteStandsByIdUtilisateur(id_utilisateur) {
    return pool.query("DELETE FROM stand WHERE id_utilisateur = ?", [id_utilisateur]);
}

// Mettre à jour un stand
function updateStand(id_stand, libelle_stand, id_emplacement, id_utilisateur) {
    return pool.query("UPDATE stand SET libelle_stand = ?, id_emplacement = ?, id_utilisateur = ? WHERE id_stand = ?", [libelle_stand, id_emplacement, id_utilisateur, id_stand])
        .then(([result]) => getStand(id_stand));
}

// Récurerer touts les stands d'un utilisateur
function getStandsByIdUtilisateur(id_utilisateur){
    return pool.query("SELECT * FROM stand WHERE id_utilisateur = ?", [id_utilisateur]).then(([rows]) => rows);
}

// Récuperer touts les stands d'un emplacement
function getStandsByIdEmplacement(id_emplacement){
    return pool.query("SELECT * FROM stand WHERE id_emplacement = ?", [id_emplacement]).then(([rows]) => rows);
}

module.exports = {
    getStands,
    getStand,
    createStand,
    deleteStand,
    updateStand,
    getStandsByIdUtilisateur,
    getStandsByIdEmplacement,
    deleteStandsByIdUtilisateur,
};
