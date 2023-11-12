const pool = require('../../config/db');

// Récupérer tous les emplacements
function getEmplacements() {
    return pool.query("SELECT * FROM emplacement").then(([rows]) => rows);
}

// Récupérer un emplacement en fonction de son ID
function getEmplacement(id) {
    return pool.query("SELECT * FROM emplacement WHERE id_emplacement = ?", [id]).then(([rows]) => rows[0]);
}

// Créer un nouvel emplacement
function createEmplacement(libelle_emplacement) {
    return pool.query("INSERT INTO emplacement (libelle_emplacement) VALUES (?)", [libelle_emplacement])
        .then(([result]) => getEmplacement(result.insertId));
}

// Supprimer un emplacement en fonction de son ID
function deleteEmplacement(id_emplacement) {
    return pool.query("DELETE FROM emplacement WHERE id_emplacement = ?", [id_emplacement]);
}

// Mettre à jour un emplacement
function updateEmplacement(id_emplacement, libelle_emplacement) {
    return pool.query("UPDATE emplacement SET libelle_emplacement = ? WHERE id_emplacement = ?", [libelle_emplacement, id_emplacement])
        .then(([result]) => getEmplacement(id_emplacement));
}

module.exports = {
    getEmplacements,
    getEmplacement,
    createEmplacement,
    deleteEmplacement,
    updateEmplacement
};
