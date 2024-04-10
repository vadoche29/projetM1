import { Component, Input } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { LieuService } from '../services/lieu.service';
import { LieuComponent } from '../lieu/lieu.component';
import { Router } from '@angular/router';
import { Observable, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, LieuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  @Input() lieu!: LieuComp;

  data!: any[];
  data_sst_site!: any[];

  constructor(private apiService: ApiService,
              private lieuService: LieuService,
              private router: Router) { }

  ngOnInit() {
    this.loadData(); 
  }

  loadData(): void {
    this.apiService.getAllSst().subscribe(data => {
      this.data = data;});

    this.apiService.getAllSstSite().subscribe(data_sst_site => {
      this.data_sst_site = data_sst_site.filter(sst => !sst.date_depart);});
  }

  redirectToDataPage(): void {
    if (this.lieu && this.lieu.ville){
      this.router.navigate(['/data', this.lieu.ville]).then(() => {
        window.location.reload();
      }); 
    }
    else {
      console.error("Lieu ou son ID non défini");
    }
  }
  
  redirectToSignalerPage(): void {
    if (this.lieu && this.lieu.ville){
      this.router.navigate(['/signaler', this.lieu.ville]).then(() => {
        window.location.reload();
      }); // Naviguez vers la page data/:ville avec l'ID du lieu
    }
    else {
      console.error("Lieu ou son ID non défini");
    }
  }

  getNumberOfSST(site_ISEN: string): number {
    let counter = 0;
    if (this.data) {
      this.data.forEach(sst => {
        if (sst.site.toLowerCase() === site_ISEN) {
          counter++;
        }
      });
    }
    return counter;
  }

  getPresenceOfSST(site_ISEN: string): number {
    let counter = 0;
    if (this.data_sst_site) {
      this.data_sst_site.forEach(sst_site => {
        if (sst_site.site_isen.toLowerCase() === site_ISEN) {
          counter++;
        }
      });
    }
    return counter;
  }
}


