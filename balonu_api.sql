DROP TABLE if exists vol, est, vend, horaire_vol, couleur, produit, stand, emplacement, montgolfiere, utilisateur;

CREATE TABLE utilisateur(
   id_utilisateur INT AUTO_INCREMENT,
   login_utilisateur VARCHAR(50),
   mot_de_passe_utilisateur VARCHAR(50),
   nom_utilisateur VARCHAR(50),
   prenom_utilisateur VARCHAR(50),
   mail_utilisateur VARCHAR(50),
   adresse_utilisateur VARCHAR(200),
   telephone_utilisateur VARCHAR(10),
   est_admin BOOLEAN,
   est_montgolfier BOOLEAN,
   est_prestataire BOOLEAN,
   PRIMARY KEY(Id_utilisateur)
);

CREATE TABLE montgolfiere(
   id_montgolfiere INT AUTO_INCREMENT,
   nombre_place INT,
   libelle_montgolfiere VARCHAR(200),
   photo VARCHAR(200),
   id_utilisateur INT,
   PRIMARY KEY(id_montgolfiere),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur)
);

CREATE TABLE emplacement(
   id_emplacement INT AUTO_INCREMENT,
   libelle_emplacement VARCHAR(200),
   PRIMARY KEY(id_emplacement)
);

CREATE TABLE stand(
   id_stand INT AUTO_INCREMENT,
   libelle_stand VARCHAR(200),
   id_emplacement INT,
   id_utilisateur INT,
   PRIMARY KEY(Id_stand),
   UNIQUE(id_emplacement),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur)
);

CREATE TABLE produit(
   id_produit INT AUTO_INCREMENT,
   libelle_produit VARCHAR(200),
   stock INT,
   PRIMARY KEY(id_produit)
);

CREATE TABLE couleur(
   id_couleur INT AUTO_INCREMENT,
   libelle_couleur VARCHAR(50),
   PRIMARY KEY(id_couleur)
);

CREATE TABLE horaire_vol(
   id_horaire_vol INT AUTO_INCREMENT,
   date_vol DATE,
   horaire_vol TIME,
   PRIMARY KEY(id_horaire_vol)
);

CREATE TABLE vend(
   id_stand INT,
   id_produit INT,
   prix_produit DECIMAL(15,2),
   PRIMARY KEY(id_stand, id_produit),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_produit) REFERENCES produit(id_produit)
);

CREATE TABLE est(
   id_montgolfiere INT,
   id_couleur INT,
   PRIMARY KEY(id_montgolfiere, id_couleur),
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere),
   FOREIGN KEY(id_couleur) REFERENCES couleur(id_couleur)
);

CREATE TABLE vol(
   id_utilisateur INT,
   id_montgolfiere INT,
   id_horaire_vol INT,
   prix_vol DECIMAL(15,2),
   libelle_vol VARCHAR(200),
   PRIMARY KEY(id_utilisateur, id_montgolfiere, id_horaire_vol),
   FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
   FOREIGN KEY(id_montgolfiere) REFERENCES montgolfiere(id_montgolfiere),
   FOREIGN KEY(id_horaire_vol) REFERENCES horaire_vol(id_horaire_vol)
);

-- Insérer des données dans la table "utilisateur"
INSERT INTO utilisateur (Id_utilisateur, login_utilisateur, mot_de_passe_utilisateur, nom_utilisateur, prenom_utilisateur, mail_utilisateur, adresse_utilisateur, telephone_utilisateur, est_admin, est_montgolfier, est_prestataire)
VALUES
(1, 'utilisateur1', 'motdepasse1', 'Nom1', 'Prenom1', 'email1@example.com', 'Adresse1', '1234567890', 1, 0, 0),
(2, 'utilisateur2', 'motdepasse2', 'Nom2', 'Prenom2', 'email2@example.com', 'Adresse2', '9876543210', 0, 1, 0);

-- Insérer des données dans la table "montgolfiere"
INSERT INTO montgolfiere (Id_montgolfiere, nombre_place, libelle_montgolfiere, photo, Id_utilisateur)
VALUES
(1, 4, 'Montgolfiere1', 'photo1.jpg', 1),
(2, 6, 'Montgolfiere2', 'photo2.jpg', 2);

-- Insérer des données dans la table "emplacement"
INSERT INTO emplacement (Id_emplacement, libelle_emplacement)
VALUES
(1, 'Emplacement1'),
(2, 'Emplacement2');

-- Insérer des données dans la table "stand"
INSERT INTO stand (Id_stand, libelle_stand, Id_emplacement, Id_utilisateur)
VALUES
(1, 'Stand1', 1, 1),
(2, 'Stand2', 2, 2);

-- Insérer des données dans la table "produit"
INSERT INTO produit (Id_produit, libelle_produit, stock)
VALUES
(1, 'Produit1', 10),
(2, 'Produit2', 20);

-- Insérer des données dans la table "couleur"
INSERT INTO couleur (Id_couleur, libelle_couleur)
VALUES
(1, 'Rouge'),
(2, 'Bleu');

-- Insérer des données dans la table "horaire_vol"
INSERT INTO horaire_vol (Id_horaire_vol, date_vol, horaire_vol)
VALUES
(1, '2023-11-06', '14:00:00'),
(2, '2023-11-07', '10:30:00');

-- Insérer des données dans la table "vend"
INSERT INTO vend (Id_stand, Id_produit, prix_produit)
VALUES
(1, 1, 19.99),
(2, 2, 24.99);

-- Insérer des données dans la table "est"
INSERT INTO est (Id_montgolfiere, Id_couleur)
VALUES
(1, 1),
(1, 2),
(2, 1);

-- Insérer des données dans la table "vol"
INSERT INTO vol (Id_utilisateur, Id_montgolfiere, Id_horaire_vol, prix_vol, libelle_vol)
VALUES
(1, 1, 1, 99.99, 'Vol 1'),
(2, 2, 2, 149.99, 'Vol 2');