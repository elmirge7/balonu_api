const pool = require('../../config/db');

// Récupérer touts les vols
function getAssociations() {
    return pool.query("SELECT * FROM est").then(([rows]) => rows);
}


// Récupérer une association en fonction d'une montgolfiere et d'une couleur
function getAssociation(id_montgolfiere, id_couleur) {
    return pool.query("SELECT * FROM est WHERE id_montgolfiere = ? AND id_couleur = ?", [id_montgolfiere, id_couleur]).then(([rows]) => rows[0]);
}

// Créer un nouvel association entre montgolfiere et couleur
function createAssociation(id_montgolfiere, id_couleur) {
    return pool.query("INSERT INTO est (id_montgolfiere, id_couleur) VALUES (?, ?)", [id_montgolfiere, id_couleur])
        .then(([result]) => getAssociation(id_montgolfiere, id_couleur));
}

// Supprimer une association entre montgolfiere et couleur
function deleteAssociation(id_montgolfiere, id_couleur) {
    return pool.query("DELETE FROM est WHERE id_montgolfiere = ? AND id_couleur = ?", [id_montgolfiere, id_couleur]);
}

// Récupérer toutes les associations d'une montgolfiere
function getAllAssociationsForMontgolfiere(id_montgolfiere) {
    return pool.query("SELECT * FROM est WHERE id_montgolfiere = ?", [id_montgolfiere]);
}

// Récupérer toutes les associations d'une couleurs
function getAllAssociationsForCouleur(id_couleur) {
    return pool.query("SELECT * FROM est WHERE id_couleur = ?", [id_couleur]);
}

module.exports = {
    getAssociations,
    getAssociation,
    createAssociation,
    deleteAssociation,
    getAllAssociationsForMontgolfiere,
    getAllAssociationsForCouleur
};
