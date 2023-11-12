const pool = require('../../config/db');

function getAssociation(id_montgolfiere, id_couleur) {
    return pool.query("SELECT * FROM est WHERE id_montgolfiere = ? AND id_couleur = ?", [id_montgolfiere, id_couleur]).then(([rows]) => rows[0]);
}

function createAssociation(id_montgolfiere, id_couleur) {
    return pool.query("INSERT INTO est (id_montgolfiere, id_couleur) VALUES (?, ?)", [id_montgolfiere, id_couleur])
        .then(([result]) => getAssociation(id_montgolfiere, id_couleur));
}

function deleteAssociation(id_montgolfiere, id_couleur) {
    return pool.query("DELETE FROM est WHERE id_montgolfiere = ? AND id_couleur = ?", [id_montgolfiere, id_couleur]);
}

function getAllAssociationsForMontgolfiere(id_montgolfiere) {
    return pool.query("SELECT * FROM est WHERE id_montgolfiere = ?", [id_montgolfiere]);
}

function getAllAssociationsForCouleur(id_couleur) {
    return pool.query("SELECT * FROM est WHERE id_couleur = ?", [id_couleur]);
}

module.exports = {
    getAssociation,
    createAssociation,
    deleteAssociation,
    getAllAssociationsForMontgolfiere,
    getAllAssociationsForCouleur
};
