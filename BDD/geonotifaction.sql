#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Presence
#------------------------------------------------------------

CREATE TABLE Presence(
        Identifiant          Int  Auto_increment  NOT NULL ,
        Presence_sur_le_site Int NOT NULL
	,CONSTRAINT Presence_PK PRIMARY KEY (Identifiant)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Site
#------------------------------------------------------------

CREATE TABLE Site(
        Identifiant Int  Auto_increment  NOT NULL ,
        ISEN        Varchar (10) NOT NULL
	,CONSTRAINT Site_PK PRIMARY KEY (Identifiant)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: SST
#------------------------------------------------------------

CREATE TABLE SST(
        Identifiant          Int  Auto_increment  NOT NULL ,
        Nom                  Varchar (30) NOT NULL ,
        Prenom               Varchar (30) NOT NULL ,
        Sexe                 Varchar (10) NOT NULL ,
        Age                  Int NOT NULL ,
        Identifiant_Presence Int NOT NULL ,
        Identifiant_Site     Int NOT NULL
	,CONSTRAINT SST_PK PRIMARY KEY (Identifiant)

	,CONSTRAINT SST_Presence_FK FOREIGN KEY (Identifiant_Presence) REFERENCES Presence(Identifiant)
	,CONSTRAINT SST_Site0_FK FOREIGN KEY (Identifiant_Site) REFERENCES Site(Identifiant)
)ENGINE=InnoDB;

