import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { consumerMarkDirty } from '@angular/core/primitives/signals';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

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

  getInitials(prenom: string, nom: string): string {
    const prenomInitial = prenom?.charAt(0)?.toUpperCase() || '';
    const nomInitial = nom?.charAt(0)?.toUpperCase() || '';
    return prenomInitial + nomInitial;
  }
  supprimerUtilisateur(arg0: number) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getListUtilisateur();
  }
  utilisateurs: any;
  constructor(private dataService: DataService, private dialog: MatDialog, private confirmationDialog: ConfirmationDialogService) { }
  getListUtilisateur() {
    return this.dataService.getUtilisateur().subscribe((data) => {
      this.utilisateurs = data;
      console.log(this.utilisateurs);
    });
  }

  deleteuser(id: number) {
    this.openDeleteDialog(id)
  }
  openDeleteDialog(id: number): void {
    this.confirmationDialog.openConfirmationDialog(
      'Êtes-vous sûr de vouloir supprimer cet élément ?'
    ).subscribe(result => {
      if (result) {
        this.dataService.deleteUser(id).subscribe({
          next: (response) => {
          // Traiter la réponse ici
         
          this.dialog
            .open(SuccessDialogComponent, {
              data: { message: 'Utilisateur supprimé avec succès' },
              width: '400px',
            })
            .afterClosed()
            .subscribe((result) => {
              window.location.reload();
            });
        },
        error: (error) => {
          // Gérer les erreurs ici
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        }
        });
      } else {
        // Utilisateur a cliqué "Non"
      }
    });
  }
}

