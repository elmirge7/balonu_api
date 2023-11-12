const pool = require('../../config/db');

// Récupérer toutes les ventes
function getVentes() {
    return pool.query("SELECT * FROM vend").then(([rows]) => rows);
}

function createVente(id_stand, id_produit, prix_produit) {
    return pool.query("INSERT INTO vend (id_stand, id_produit, prix_produit) VALUES (?, ?, ?)", [id_stand, id_produit, prix_produit]);
}

function deleteVente(id_stand, id_produit) {
    return pool.query("DELETE FROM vend WHERE id_stand = ? AND id_produit = ?", [id_stand, id_produit]);
}

// Récupérer toutes les ventes d'un stand
function getAllVentesForStand(id_stand) {
    return pool.query("SELECT * FROM vend WHERE id_stand = ?", [id_stand]).then(([rows]) => rows);
}

// Récupérer toutes les ventes d'un produit
function getAllVentesForProduit(id_produit) {
    return pool.query("SELECT * FROM vend WHERE id_produit = ?", [id_produit]).then(([rows]) => rows);
}

module.exports = {
    getVentes,
    createVente,
    deleteVente,
    getAllVentesForStand,
    getAllVentesForProduit
};
