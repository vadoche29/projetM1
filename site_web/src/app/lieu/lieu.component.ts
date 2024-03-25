import { Component, Input } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lieu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lieu.component.html',
  styleUrl: './lieu.component.scss'
})
export class LieuComponent{
  @Input() lieu!: LieuComp;

  data!: any[];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getAllSst().subscribe(data => {
      //console.log(data);
      this.data = data;
    });
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
        if (sst.site === site_ISEN) {
          counter++;
        }
      });
    }
    return counter;
  }
}
 
