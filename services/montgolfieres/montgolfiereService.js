const pool = require('../../config/db');

// Obtenir toutes les montgolfières
function getMontgolfieres() {
    return pool.query("SELECT * FROM montgolfiere").then(([rows]) => rows);
}

//Obtenir une montgolfière en fonction de son id
function getMontgolfiere(id) {
    return pool.query("SELECT * FROM montgolfiere WHERE id_montgolfiere = ?", [id]).then(([rows]) => rows[0]);
}

// Créer une montgolfière
function createMontgolfiere(nombre_place, libelle_montgolfiere, photo, id_utilisateur) {
    return pool.query("INSERT INTO montgolfiere (nombre_place, libelle_montgolfiere, photo, id_utilisateur) VALUES (?, ?, ?, ?)", [nombre_place, libelle_montgolfiere, photo, id_utilisateur])
        .then(([result]) => getMontgolfiere(result.insertId));
}

//supprimer une montgolfiere
function deleteMontgolfiere(id_montgolfiere) {
    return pool.query("DELETE FROM montgolfiere WHERE id_montgolfiere = ?", [id_montgolfiere]);
}

// Mettre à jour une montgolfière
function updateMontgolfiere(nombre_place, libelle_montgolfiere, photo, id_utilisateur){
    return pool.query("UPDATE montgolfiere SET nombre_place = ?, libelle_montgolfiere = ?, photo = ?, id_utilisateur = ?", [nombre_place, libelle_montgolfiere, photo, id_utilisateur])
        .then(([result]) => getMontgolfiere(id_montgolfiere));
}

// Récupérer les montgolfieres d'un utilisateur
function getMontgolfiereByIdUtilisateur(id_utilisateur){
    return pool.query("SELECT * FROM montgolfiere WHERE id_utilisateur = ?", [id_utilisateur])
}

module.exports = {
    getMontgolfieres,
    getMontgolfiere,
    createMontgolfiere,
    deleteMontgolfiere,
    updateMontgolfiere,
    getMontgolfiereByIdUtilisateur
};