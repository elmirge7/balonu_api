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
   Id_montgolfiere INT,
   nombre_place INT,
   libelle_montgolfiere VARCHAR(200),
   photo VARCHAR(200),
   Id_utilisateur INT,
   PRIMARY KEY(Id_montgolfiere),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur)
);

CREATE TABLE emplacement(
   Id_emplacement INT,
   libelle_emplacement VARCHAR(200),
   PRIMARY KEY(Id_emplacement)
);

CREATE TABLE stand(
   Id_stand INT,
   libelle_stand VARCHAR(200),
   Id_emplacement INT,
   Id_utilisateur INT,
   PRIMARY KEY(Id_stand),
   UNIQUE(Id_emplacement),
   FOREIGN KEY(Id_emplacement) REFERENCES emplacement(Id_emplacement),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur)
);

CREATE TABLE produit(
   Id_produit INT,
   libelle_produit VARCHAR(200),
   stock INT,
   PRIMARY KEY(Id_produit)
);

CREATE TABLE couleur(
   Id_couleur INT,
   libelle_couleur VARCHAR(50),
   PRIMARY KEY(Id_couleur)
);

CREATE TABLE horaire_vol(
   Id_horaire_vol INT,
   date_vol DATE,
   horaire_vol TIME,
   PRIMARY KEY(Id_horaire_vol)
);

CREATE TABLE vend(
   Id_stand INT,
   Id_produit INT,
   prix_produit DECIMAL(15,2),
   PRIMARY KEY(Id_stand, Id_produit),
   FOREIGN KEY(Id_stand) REFERENCES stand(Id_stand),
   FOREIGN KEY(Id_produit) REFERENCES produit(Id_produit)
);

CREATE TABLE est(
   Id_montgolfiere INT,
   Id_couleur INT,
   PRIMARY KEY(Id_montgolfiere, Id_couleur),
   FOREIGN KEY(Id_montgolfiere) REFERENCES montgolfiere(Id_montgolfiere),
   FOREIGN KEY(Id_couleur) REFERENCES couleur(Id_couleur)
);

CREATE TABLE vol(
   Id_utilisateur INT,
   Id_montgolfiere INT,
   Id_horaire_vol INT,
   prix_vol DECIMAL(15,2),
   libelle_vol VARCHAR(200),
   PRIMARY KEY(Id_utilisateur, Id_montgolfiere, Id_horaire_vol),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur),
   FOREIGN KEY(Id_montgolfiere) REFERENCES montgolfiere(Id_montgolfiere),
   FOREIGN KEY(Id_horaire_vol) REFERENCES horaire_vol(Id_horaire_vol)
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