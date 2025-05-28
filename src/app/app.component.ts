import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sndi_doc';
  constructor(public router: Router) {}
  isAccueil(): boolean {
    return this.router.url === '/'||  this.router.url==='/login' // ou '/pageAccueil' selon ton chemin
  }
  isUtilisateur(): boolean {
    return this.router.url === '/'// ou '/pageAccueil' selon ton chemin
  }
}
