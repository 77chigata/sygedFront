import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

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
  constructor(private authService: AuthService, private router: Router, private confirmationDialog: ConfirmationDialogService) {}
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
    isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout(): void {
    this.confirmationDialog.openConfirmationDialog(
          ' Voulez-vous vraiment vous déconnecter ?'
        ).subscribe(result => {
          if (result) {
           localStorage.removeItem('jwt'); // ou sessionStorage.clear();

    // Redirection vers la page de connexion
    this.router.navigate(['/login']);
          } else {
            // Utilisateur a cliqué "Non"
          }
        });
    // Supprimez le token ou l'information de session (localStorage, sessionStorage, etc.)
    
  }
}
