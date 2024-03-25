#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: site
#------------------------------------------------------------

CREATE TABLE site(
        site_isen Varchar (50) NOT NULL ,
        x         Float NOT NULL ,
        y         Float NOT NULL ,
        rayon     Float NOT NULL,
        CONSTRAINT site_PK PRIMARY KEY (site_isen)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sst
#------------------------------------------------------------

CREATE TABLE sst(
        id_sst      Int  Auto_increment  NOT NULL ,
        id_firebase Varchar (200) NOT NULL ,
        nom         Varchar (30) NOT NULL ,
        prenom      Varchar (30) NOT NULL ,
        numero_tel  Varchar (20) NOT NULL ,
        site_isen   Varchar (50) NOT NULL
	,CONSTRAINT sst_PK PRIMARY KEY (id_sst)

	,CONSTRAINT sst_site_FK FOREIGN KEY (site_isen) REFERENCES site(site_isen)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: incident
#------------------------------------------------------------

CREATE TABLE incident(
        id_incident          Int  Auto_increment  NOT NULL ,
        site                 Varchar (20) NOT NULL ,
        date                 Datetime NOT NULL ,
        lieux                Varchar (50) NOT NULL ,
        caracteristiques     Varchar (200) NOT NULL ,
        nom                  Varchar (30) NOT NULL ,
        prenom               Varchar (30) NOT NULL ,
        numero_tel_signalant Varchar (20) NOT NULL ,
        site_isen            Varchar (50) NOT NULL
	,CONSTRAINT incident_PK PRIMARY KEY (id_incident)

	,CONSTRAINT incident_site_FK FOREIGN KEY (site_isen) REFERENCES site(site_isen)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: etat
#------------------------------------------------------------

CREATE TABLE etat(
        etat_id Int NOT NULL ,
        etat    Varchar (100) NOT NULL
	,CONSTRAINT etat_PK PRIMARY KEY (etat_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sst_incident
#------------------------------------------------------------

CREATE TABLE sst_incident(
        id_sst       Int NOT NULL ,
        id_incident  Int NOT NULL ,
        etat_id      Int NOT NULL ,
        intervenant1 TinyINT ,
        heure_etat   Datetime NOT NULL
	,CONSTRAINT sst_incident_PK PRIMARY KEY (id_sst,id_incident,etat_id)

	,CONSTRAINT sst_incident_sst_FK FOREIGN KEY (id_sst) REFERENCES sst(id_sst)
	,CONSTRAINT sst_incident_incident0_FK FOREIGN KEY (id_incident) REFERENCES incident(id_incident)
	,CONSTRAINT sst_incident_etat1_FK FOREIGN KEY (etat_id) REFERENCES etat(etat_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sst_site
#------------------------------------------------------------

CREATE TABLE sst_site(
        site_isen    Varchar (50) NOT NULL ,
        id_sst       Int NOT NULL ,
        date_arrivee Datetime ,
        date_depart  Datetime
	,CONSTRAINT sst_site_PK PRIMARY KEY (site_isen,id_sst)

	,CONSTRAINT sst_site_site_FK FOREIGN KEY (site_isen) REFERENCES site(site_isen)
	,CONSTRAINT sst_site_sst0_FK FOREIGN KEY (id_sst) REFERENCES sst(id_sst)
)ENGINE=InnoDB;

