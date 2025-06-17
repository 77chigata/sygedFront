import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { consumerMarkDirty } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-listeutilisateur',
  standalone: false,
  templateUrl: './listeutilisateur.component.html',
  styleUrl: './listeutilisateur.component.css',
})
export class ListeutilisateurComponent implements OnInit {
  router: any;
  modifierUtilisateur(_t5: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    contact: string;
    role: string;
    departement: string;
  }) {
    this.router.navigate(['/formulaire.component.html']); // redirige vers formulaire avec ID

    throw new Error('Method not implemented.');
  }

  supprimerUtilisateur(arg0: number) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getListUtilisateur();
  }
  utilisateurs: any;
  constructor(private dataService: DataService) {}
  getListUtilisateur() {
    return this.dataService.getUtilisateur().subscribe((data) => {
      this.utilisateurs = data;
      console.log(this.utilisateurs);
    });
  }
}
