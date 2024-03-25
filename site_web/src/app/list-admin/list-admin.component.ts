import { Component, OnInit } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';
import { LieuService } from '../services/lieu.service';
import { LieuComponent } from '../lieu/lieu.component';
import { AdminComponent } from '../admin/admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-admin',
  standalone: true,
  imports: [CommonModule, LieuComponent, AdminComponent],
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.scss'
})
export class ListAdminComponent {
  lieux!: LieuComp[]; 

  constructor(private lieuService: LieuService, private router: Router) {
  }

  ngOnInit(){
    this.lieux = this.lieuService.lieux;
  }

}
