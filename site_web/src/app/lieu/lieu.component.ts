import { Component, Input } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getAllData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }
}
 
