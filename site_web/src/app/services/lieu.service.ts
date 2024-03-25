import { Injectable } from "@angular/core";
import { LieuComp } from "../models/lieu.model";

@Injectable({
	providedIn: 'root'
})

export class LieuService {
	lieux : LieuComp[] =  [ {id : 1,
	ville: 'Brest',
	title: 'Isen de Brest',
	date: new Date(),
	image_url: 'https://isen-brest.fr/wp-content/uploads/2016/09/ecole-ingenieur-brest-400x300.jpg',
	nb_sst_totaux : 0
	},
	{id : 2,
	ville: 'Nantes',
	title: 'Isen de Nantes',
	date: new Date(),
	image_url: 'https://isen-nantes.fr/wp-content/uploads/2023/04/WEB-vignette-nantes.jpg',
	nb_sst_totaux : 0
	},
	{id : 3,
	ville: 'Caen',
	title: 'Isen de Caen',
	date: new Date(),
	image_url: 'https://isen-caen.fr/wp-content/uploads/2023/12/WEB-vignette-nantes.jpg',
	nb_sst_totaux : 0
	},
	{id : 4,
	ville: 'Rennes',
	title: 'Isen de Rennes',
	date: new Date(),
	image_url: 'https://www.isen.fr/wp-content/uploads/2016/09/ISEN-Rennes_SB.jpg',
	nb_sst_totaux : 0
	}
	];

	getAllLieu(): LieuComp[] {
		return this.lieux;
	} 

	getLieuByVille(Lieuville: String) : LieuComp {
		const lieu = this.lieux.find(lieu => lieu.ville === Lieuville);
		if (!lieu) {
			throw new Error('Lieu not found');
		}
		else {
			return lieu;
		}
	}


}