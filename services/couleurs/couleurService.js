const pool = require('../../config/db');

// Récupérer toutes les couleurs
function getCouleurs() {
    return pool.query("SELECT * FROM couleur").then(([rows]) => rows);
}

// Récupérer une couleur en fonction de son ID
function getCouleur(id) {
    return pool.query("SELECT * FROM couleur WHERE id_couleur = ?", [id]).then(([rows]) => rows[0]);
}

// Créer une nouvelle couleur
function createCouleur(libelle_couleur) {
    return pool.query("INSERT INTO couleur (libelle_couleur) VALUES (?)", [libelle_couleur])
        .then(([result]) => getCouleur(result.insertId));
}

// Supprimer une couleur en fonction de son ID
function deleteCouleur(id_couleur) {
    return pool.query("DELETE FROM couleur WHERE id_couleur = ?", [id_couleur]);
}

// Mettre à jour une couleur
function updateCouleur(id_couleur, libelle_couleur) {
    return pool.query("UPDATE couleur SET libelle_couleur = ? WHERE id_couleur = ?", [libelle_couleur, id_couleur])
        .then(([result]) => getCouleur(id_couleur));
}

module.exports = {
    getCouleurs,
    getCouleur,
    createCouleur,
    deleteCouleur,
    updateCouleur
};
