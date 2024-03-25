import { Component, Input } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { LieuService } from '../services/lieu.service';
import { LieuComponent } from '../lieu/lieu.component';
import { Router } from '@angular/router';

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

  constructor(private apiService: ApiService,
              private lieuService: LieuService,
              private router: Router) { }

  ngOnInit() {
    this.loadData(); 
  }

  loadData(): void {
    this.apiService.getAllSst().subscribe(data => {
      //console.log("la data la",data);
      this.data = data;
    });
  }

  redirectToDataPage(): void {
    if (this.lieu && this.lieu.ville){
      this.router.navigate(['/data', this.lieu.ville]).then(() => {
        window.location.reload();
      }); // Naviguez vers la page data/:ville avec l'ID du lieu
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
        if (sst.site === site_ISEN) {
          counter++;
        }
      });
    }
    return counter;
  }
}


