import { Component, Input, NgModule, OnInit } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Observable, interval, switchMap } from 'rxjs';


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

  constructor(private apiService: ApiService, 
              private router: Router) {}

  ngOnInit(): void {
    this.loadData();

    // Actualiser les données toutes les minutes
    /*interval(120000).pipe(
      switchMap(() => this.apiService.getAllSst())
    ).subscribe(data => {
      this.data = data;
    });

    interval(600000).pipe(
      switchMap(() => this.apiService.getAllSstSite())
    ).subscribe(data_sst_site => {
      this.data_sst_site = data_sst_site;
    });  */  
  }

  loadData(): void {
    this.apiService.getAllSst().subscribe(data => {
      this.data = data;});

    this.apiService.getAllSstSite().subscribe(data_sst_site => {
      this.data_sst_site = data_sst_site;});
  }
 
  redirectToSignalerPage(): void {
    if (this.lieu && this.lieu.ville){
      this.router.navigate(['/signaler', this.lieu.ville]).then(() => {
        window.location.reload();
      });
    }
    else {
      console.error("Location or its ID not defined");
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
 
