const pool = require('../../config/db');

// Récupérer tous les horaires de vol
function getHorairesVol() {
    return pool.query("SELECT * FROM horaire_vol").then(([rows]) => rows);
}

// Récupérer un horaire de vol en fonction de son ID
function getHoraireVol(id) {
    return pool.query("SELECT * FROM horaire_vol WHERE id_horaire_vol = ?", [id]).then(([rows]) => rows[0]);
}

// Créer un nouvel horaire de vol
function createHoraireVol(date_vol, horaire_vol) {
    return pool.query("INSERT INTO horaire_vol (date_vol, horaire_vol) VALUES (?, ?)", [date_vol, horaire_vol])
        .then(([result]) => getHoraireVol(result.insertId));
}

// Supprimer un horaire de vol en fonction de son ID
function deleteHoraireVol(id_horaire_vol) {
    return pool.query("DELETE FROM horaire_vol WHERE id_horaire_vol = ?", [id_horaire_vol]);
}

// Mettre à jour un horaire de vol
function updateHoraireVol(id_horaire_vol, date_vol, horaire_vol) {
    return pool.query("UPDATE horaire_vol SET date_vol = ?, horaire_vol = ? WHERE id_horaire_vol = ?", [date_vol, horaire_vol, id_horaire_vol])
        .then(([result]) => getHoraireVol(id_horaire_vol));
}

module.exports = {
    getHorairesVol,
    getHoraireVol,
    createHoraireVol,
    deleteHoraireVol,
    updateHoraireVol
};
