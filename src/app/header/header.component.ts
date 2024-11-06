import { Component } from '@angular/core';
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
  isMobile: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private auth: AuthService) {}

  login(): void {
    this.auth.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated) {
          this.auth.loginWithRedirect();
        } else {
          console.log('Usuário já autenticado');
        }
      },
      (error) => {
        console.error('Erro ao verificar autenticação:', error);
      }
    );
  }
  logout(): void {
    this.auth.logout();
  }
}
