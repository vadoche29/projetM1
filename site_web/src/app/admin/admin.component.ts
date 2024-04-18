import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { LieuService } from '../services/lieu.service';
import { LieuComponent } from '../lieu/lieu.component';
import { Router } from '@angular/router';
import { Observable, interval, switchMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, LieuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy{
  @Input() lieu!: LieuComp;

  data!: any[];
  data_sst_site!: any[];
  private subscription!: Subscription;

  constructor(private apiService: ApiService,
              private lieuService: LieuService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadData(); 
    this.refreshPage();
    this.subscription = interval(20000) // 20000ms = 20s
      .pipe(
        switchMap(() => this.apiService.getAllSst())
      )
      .subscribe(data => {
        this.data = data;
        this.updateSSTCounts();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(): void {
    this.apiService.getAllSst().subscribe(data => {
      this.data = data;
      this.updateSSTCounts();
    });

    this.apiService.getAllSstSite().subscribe(data_sst_site => {
      this.data_sst_site = data_sst_site.filter(sst => !sst.date_depart);
      this.updateSSTCounts();
    });
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
    if (this.lieu && this.lieu.ville && this.lieu.presenceSST > 0){
      this.router.navigate(['/signaler', this.lieu.ville]).then(() => {
        window.location.reload();
      }); // Naviguez vers la page data/:ville avec l'ID du lieu
    }
    else {
      console.error("Lieu ou son ID non défini");
      this.router.navigate(['/absence']).then(() => {
        window.location.reload();
      }); // Naviguez vers la page d'absence
    }
  }

  refreshPage(): void {
    setInterval(() => {
      window.location.reload();
    }, 30000); // Rafraîchissement toutes les 20 secondes
  }

  updateSSTCounts(): void {
    if (this.data && this.data_sst_site) {
      // Calcul du nombre de SST présents sur le site
      const totalCount = this.data.filter(sst => sst.site.toLowerCase() === this.lieu.ville).length;
      // Calcul du nombre de SST recensés
      const presenceCount = this.data_sst_site.filter(sst_site => sst_site.site_isen.toLowerCase() === this.lieu.ville).length;
      console.log('Nombre de SST présents à ', this.lieu.ville, " :" ,presenceCount);
      // Mise à jour des valeurs
      this.lieu.presenceSST = presenceCount;
      this.lieu.totalSST = totalCount;
    }
  }

}


