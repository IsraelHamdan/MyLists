import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  protected isMobile: boolean = false;
  protected isAuthenticated: boolean = false;
  protected isDropdown: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      },
      error: (error) => {
        console.log(`Erro ao verificar autentivação: ${error}`);
      },
    });
  }

  login(): void {
    this.auth.loginWithRedirect();
  }
  logout(): void {
    this.auth.logout();
  }

  toggleDropdown(): void {
    this.isDropdown = !this.isDropdown;
  }
}
