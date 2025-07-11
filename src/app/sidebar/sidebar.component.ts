import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  user: any;
  async ngOnInit() {
    await this.getUserInfo();
  }
  constructor(private authService: AuthService, private router: Router) {}
  async getUserInfo(): Promise<void> {
    this.authService.getUserUtilisateur().subscribe((data) => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(this.user));
     
    });
  }
  hasRole(id: number): boolean {

    return this.user?.roles?.some((role: any) => role.idRole === id);
    
  }
  goToProfile() {
    this.router.navigate(['/envoifichier']); // remplace '/profil' par ta route cible
  }

  logout(): void {
    // Supprimez le token ou l'information de session (localStorage, sessionStorage, etc.)
    localStorage.removeItem('jwt'); // ou sessionStorage.clear();

    // Redirection vers la page de connexion
    this.router.navigate(['/login']);
  }
}
