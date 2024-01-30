import { Component, Input } from '@angular/core';
import { LieuComp } from '../models/lieu.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lieu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lieu.component.html',
  styleUrl: './lieu.component.scss'
})
export class LieuComponent{
  @Input() lieu!: LieuComp;
}
 
