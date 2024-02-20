import { Component, OnInit } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { LieuService } from '../services/lieu.service';
import { LieuComponent } from '../lieu/lieu.component';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-list', 
  standalone: true,
  imports: [CommonModule,LieuComponent, AdminComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

  lieux!: LieuComp[]; 

  constructor(private lieuService: LieuService) {
  }

  ngOnInit(){
    this.lieux = this.lieuService.lieux;
  }
}
