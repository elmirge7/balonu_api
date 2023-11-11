const pool = require('../../config/db');

function getStands() {
    return pool.query("SELECT * FROM stand").then(([rows]) => rows);
}

function getStand(id) {
    return pool.query("SELECT * FROM stand WHERE id_stand = ?", [id]).then(([rows]) => rows[0]);
}

function createStand(libelle_stand, id_emplacement, id_utilisateur) {
    return pool.query("INSERT INTO stand (libelle_stand, id_emplacement, id_utilisateur) VALUES (?, ?, ?)", [libelle_stand, id_emplacement, id_utilisateur])
        .then(([result]) => getStand(result.insertId));
}

function deleteStand(id_stand) {
    return pool.query("DELETE FROM stand WHERE id_stand = ?", [id_stand]);
}

function updateStand(id_stand, libelle_stand, id_emplacement, id_utilisateur) {
    return pool.query("UPDATE stand SET libelle_stand = ?, id_emplacement = ?, id_utilisateur = ? WHERE id_stand = ?", [libelle_stand, id_emplacement, id_utilisateur, id_stand])
        .then(([result]) => getStand(id_stand));
}

// Récupérer les stands d'un utilisateur
function getStandsByIdUtilisateur(id_utilisateur){
    return pool.query("SELECT * FROM stand WHERE id_utilisateur = ?", [id_utilisateur]).then(([rows]) => rows);
}

// Récupérer les stands d'un emplacement
function getStandsByIdEmplacement(id_emplacement){
    return pool.query("SELECT * FROM stand WHERE id_emplacement = ?", [id_utilisateur]).then(([rows]) => rows);
}

module.exports = {
    getStands,
    getStand,
    createStand,
    deleteStand,
    updateStand,
    getStandsByIdUtilisateur,
    getStandsByIdEmplacement,
};
