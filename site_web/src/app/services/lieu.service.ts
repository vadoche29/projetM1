import { Injectable } from "@angular/core";
import { LieuComp } from "../models/lieu.model";

@Injectable({
	providedIn: 'root'
})

export class LieuService {
	lieux : LieuComp[] =  [ {id : 1,
	title: 'Isen de Brest',
	date: new Date(),
	image_url: 'https://isen-brest.fr/wp-content/uploads/2016/09/ecole-ingenieur-brest-400x300.jpg',
	nb_sst_present: 0,
	nb_sst_totaux : 6
	},
	{id : 2,
	title: 'Isen de Caen',
	date: new Date(),
	image_url: 'https://isen-caen.fr/wp-content/uploads/2023/12/WEB-vignette-nantes.jpg',
	nb_sst_present: 8,
	nb_sst_totaux : 12
	},
	{id : 3,
	title: 'Isen de Nantes',
	date: new Date(),
	image_url: 'https://isen-nantes.fr/wp-content/uploads/2023/04/WEB-vignette-nantes.jpg',
	nb_sst_present: 54,
	nb_sst_totaux : 89
	},
	{id : 4,
	title: 'Isen de Rennes',
	date: new Date(),
	image_url: 'https://www.isen.fr/wp-content/uploads/2016/09/ISEN-Rennes_SB.jpg',
	nb_sst_present: 4,
	nb_sst_totaux : 9
	}
	];

	getAllLieu(): LieuComp[] {
		return this.lieux;
	} 

	getLieuById(id: number): LieuComp | undefined {
		const lieu: LieuComp | undefined = this.lieux.find(l => l.id == id);
		if (!lieu) {
			throw new Error('Lieu not found');
		}
		else{
			return lieu;
		}
	}


}