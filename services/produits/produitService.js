const pool = require('../../config/db');

// Récupérer tous les produits
function getProduits() {
    return pool.query("SELECT * FROM produit").then(([rows]) => rows);
}

// Récupérer un produit en fonction de son ID
function getProduit(id) {
    return pool.query("SELECT * FROM produit WHERE id_produit = ?", [id]).then(([rows]) => rows[0]);
}

// Créer un nouveau produit
function createProduit(libelle_produit) {
    return pool.query("INSERT INTO produit (libelle_produit) VALUES (?)", [libelle_produit])
        .then(([result]) => getProduit(result.insertId));
}

// Supprimer un produit en fonction de son ID
function deleteProduit(id_produit) {
    return pool.query("DELETE FROM produit WHERE id_produit = ?", [id_produit]);
}

// Mettre à jour un produit
function updateProduit(id_produit, libelle_produit) {
    return pool.query("UPDATE produit SET libelle_produit = ? WHERE id_produit = ?", [libelle_produit, id_produit])
        .then(([result]) => getProduit(id_produit));
}

module.exports = {
    getProduits,
    getProduit,
    createProduit,
    deleteProduit,
    updateProduit,
};
