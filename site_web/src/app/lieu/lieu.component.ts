import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Observable, Subscription, interval, switchMap } from 'rxjs';


@Component({
  selector: 'app-lieu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lieu.component.html',
  styleUrl: './lieu.component.scss'
})

export class LieuComponent implements OnInit{
  @Input() lieu!: LieuComp;

  data!: any[];
  data_sst_site!: any[];
  private subscription!: Subscription;

  constructor(private apiService: ApiService, 
              private router: Router) {}

  ngOnInit(): void {
    this.loadData(); 
    //this.refreshPage();
    /*this.subscription = interval(20000) // 20000ms = 20s
      .pipe(
        switchMap(() => this.apiService.getAllSst())
      )
      .subscribe(data => {
        this.data = data;
        this.updateSSTCounts();
      });*/
  }

  /*ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }*/

  loadData(): void {
    this.apiService.getAllSst().subscribe(data => {
      this.data = data;
      //this.updateSSTCounts();
    });

    this.apiService.getAllSstSite().subscribe(data_sst_site => {
      this.data_sst_site = data_sst_site.filter(sst => !sst.date_depart);
      //this.updateSSTCounts();
    });
  }
 
  redirectToSignalerPage(): void {
    if (this.lieu && this.lieu.ville && this.getPresenceOfSST(this.lieu.ville) > 0){
      this.router.navigate(['/signaler', this.lieu.ville]).then(() => {
        if (typeof window !== 'undefined') {
          window.location.reload();
        } 
        else {
          console.error("Window object not defined");
        } 
      });
    }
    else {
      console.error("Location or its ID not defined");
      this.router.navigate(['/absence']).then(() => {
        window.location.reload();
      });
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

  /*refreshPage(): void {
    setInterval(() => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      } 
      else {
        console.error("Window object not defined");
      }     
    }, 30000); // Rafraîchissement toutes les 20 secondes
  }

  updateSSTCounts(): void {
    if (this.data && this.data_sst_site) {
      // Calcul du nombre de SST présents sur le site
      const totalCount = this.data.filter(sst => sst.site.toLowerCase() === this.lieu.ville).length;
      // Calcul du nombre de SST recensés
      const presenceCount = this.data_sst_site.filter(sst_site => sst_site.site_isen.toLowerCase() === this.lieu.ville).length;
      //console.log('Nombre de SST présents à ', this.lieu.ville, " :" ,presenceCount);
      // Mise à jour des valeurs
      this.lieu.presenceSST = presenceCount;
      this.lieu.totalSST = totalCount;
    }
  }*/
}
 
