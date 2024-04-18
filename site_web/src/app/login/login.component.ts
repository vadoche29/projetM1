import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  @ViewChild('ctaButton') ctaButton!: ElementRef<HTMLButtonElement>;

  check: number = 0;

  email = '';
  password = '';

  showLoginForm: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password);
  }

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  ngAfterViewInit() {
    this.ctaButton.nativeElement.addEventListener('click', (e: Event) => {
      const text = (e.target as HTMLElement).nextElementSibling;
      const loginText = (e.target as HTMLElement).parentElement;
      
      if (text && loginText) {
        text.classList.toggle('show-hide');
        loginText.classList.toggle('expand');
        if (this.check == 0) {
          this.ctaButton.nativeElement.innerHTML = "<i class=\"fas fa-chevron-up\"></i>";
          this.check++;
        } else {
          this.ctaButton.nativeElement.innerHTML = "<i class=\"fas fa-chevron-down\"></i>";
          this.check = 0;
        }
      }
    });
  }
}

