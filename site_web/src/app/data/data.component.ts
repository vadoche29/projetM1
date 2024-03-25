import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { LieuService } from '../services/lieu.service';
import { ActivatedRoute } from '@angular/router';
import { LieuComp } from '../models/lieu.model';

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
  filteredData!: any[];
  lieu: LieuComp | undefined; 
  title: string = '';
  headingContent: string = '';

  constructor(private apiService: ApiService, 
              private route: ActivatedRoute, 
              private lieuService: LieuService,
              @Inject(DOCUMENT) private document: Document) { }

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
    this.apiService.getAllSst().subscribe(data => {
      //console.log(data);
      this.data = data;
      this.filteredData = this.data.filter(sst => sst.site === this.getRouteVille());
    });

    this.apiService.getAllSite().subscribe(sites => {
      //console.log(sites);
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

  getNumberOfSST(site_ISEN: string): number {
    let counter = 0;
    if (this.data) {
      this.data.forEach(sst => {
        if (sst.site === site_ISEN) {
          counter++;
        }
      });
    }
    return counter;
  }
}
