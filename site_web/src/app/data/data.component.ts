import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { LieuService } from '../services/lieu.service';
import { ActivatedRoute } from '@angular/router';
import { LieuComp } from '../models/lieu.model';
import { AuthService } from '../services/authentication.service';

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
    //console.log('Identifiant du lieu dans ngOnInit() :', lieuId); // Ajoutez cette ligne
    this.loadData();
    this.lieu = this.lieuService.getLieuByVille(lieuId);
  }

  getRouteVille(): string {
    return this.route.snapshot.params['ville'];
  }  

  loadData(): void {
    this.apiService.getAllSstSite().subscribe(sstSiteData => {
      // Récupérer les données de sst_site
      const sstIds = sstSiteData.filter(item => !item.date_depart && item.site_isen.toLowerCase() === this.getRouteVille().toLowerCase()).map(item => item.id_sst);
      console.log('Identifiants de SST :', sstIds);

      this.apiService.getAllSst().subscribe(sstData => {
        // Filtrer les données de sst en fonction des SST présents sur le site
        this.filteredData = sstData.filter(sst => sstIds.includes(sst.id_sst));        
        this.presenceOfSST = this.getPresenceOfSST(this.getRouteVille());
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

  getPresenceOfSST(site_ISEN: string): number {
    let counter = 0;
    if (this.filteredData) {
      console.log('Données filtrées :', this.filteredData);
      this.filteredData.forEach(sst => {
        if (sst.site.toLowerCase() === site_ISEN) {
          counter++;
        }
      });
    }
    return counter;
  }

  Unlog(){
    this.authService.logout();
  }
}
