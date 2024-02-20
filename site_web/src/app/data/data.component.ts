import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getAllData().subscribe(data => {
      console.log(data);
      this.data = data;
    });

    this.apiService.getAllSite().subscribe(sites => {
      console.log(sites);
      this.sites = sites;
    })
  }

}
