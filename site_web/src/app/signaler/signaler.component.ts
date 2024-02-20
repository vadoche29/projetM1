import { Component } from '@angular/core';

@Component({
  selector: 'app-signaler',
  standalone: true,
  imports: [],
  templateUrl: './signaler.component.html',
  styleUrl: './signaler.component.scss'
})
export class SignalerComponent {

}

export function getBoxTitle() {
  const element = document.querySelector('.lieu-component .signaler-button');
  const title = element ? element.getAttribute('title') : null;
  return title;
}
