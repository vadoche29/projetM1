import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { LieuService } from '../services/lieu.service';
import { ActivatedRoute } from '@angular/router';
import { LieuComp } from '../models/lieu.model';
import { AuthService } from '../services/authentication.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent implements OnInit{

  data!: any[];
  sites!: any[]; 
  data_sst_site!: any[];
  filteredData!: any[];
  lieu: LieuComp | undefined; 
  title: string = '';
  headingContent: string = '';
  presenceOfSST: number = 0;

  constructor(private apiService: ApiService, 
              private route: ActivatedRoute, 
              private lieuService: LieuService,
              @Inject(DOCUMENT) private document: Document,
              private authService : AuthService) { }

  ngOnInit(): void {
    const lieuId = this.route.snapshot.params['ville'];
    this.loadData();
    this.lieu = this.lieuService.getLieuByVille(lieuId);
  }

  // Récupération du nom de la ville dans l'URL
  getRouteVille(): string {
    return this.route.snapshot.params['ville'];
  }  

  // Chargement des données depuis les bases concernées grâce au fichier de service
  loadData(): void {
    this.apiService.getAllSstSite().subscribe(sstSiteData => {
      // Récupérer les données de sst_site si le site correspond
      const sstIds = sstSiteData.filter(item => !item.date_depart && item.site_isen.toLowerCase() === this.getRouteVille().toLowerCase()).map(item => item.id_sst);
      console.log('Identifiants de SST :', sstIds);

      this.apiService.getAllSst().subscribe(sstData => {
        // Filtrer les données de sst en fonction des SST présents sur le site
        this.filteredData = sstData.filter(sst => sstIds.includes(sst.id_sst));   
        this.presenceOfSST = this.getPresenceOfSST(this.getRouteVille());
        console.log("presence : ",this.presenceOfSST);
      });     
    });

    this.apiService.getAllSite().subscribe(sites => {
      this.sites = sites;
      this.updateTitleFromUrlVille();
    })
  }

  updateTitleFromUrlVille(): void {
    const ville = +this.route.snapshot.params['ville'];
    const site = this.sites.find(site => site.id === ville);
    if (site) {
      this.title = site.isen;
      this.document.title = this.title;
    }
  }

  // Fonction pour récupérer le nombre de SST présents sur un site donné, ainsi que leurs infos
  getPresenceOfSST(site_ISEN: string): number {
    let counter = 0;
    if (this.filteredData) {
      this.filteredData.forEach(sst => {
        console.log(this.filteredData);
        console.log(sst.site);
        counter++;
      });
    }
    return counter;
  }

  Unlog(){
    this.authService.logout();
  }
}
