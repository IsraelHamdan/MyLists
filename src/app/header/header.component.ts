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
    this.auth.loginWithRedirect();
  }
}
