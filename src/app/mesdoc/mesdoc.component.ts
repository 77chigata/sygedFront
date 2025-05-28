import { Component } from '@angular/core';
import { PartageDialogComponent } from '../partage-dialog/partage-dialog.component';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mesdoc',
  standalone: false,
  templateUrl: './mesdoc.component.html',
  styleUrl: './mesdoc.component.css',
})
export class MesdocComponent {
  router: any;
  error: any;
  success: any;
  allerVersPartage(_t16: {
    id: number;
    nom: string;
    url: string;
    dateAjout: Date;
  }) {
    throw new Error('Method not implemented.');
  }

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  documents = [
    {
      id: 1,
      nom: 'Fiche_projet.pdf',
      url: 'http://localhost:8080/documents/1/download',
      dateAjout: new Date(),
    },
    {
      id: 2,
      nom: 'Contrat_employe.docx',
      url: 'http://localhost:8080/documents/2/download',
      dateAjout: new Date(),
    },
    {
      id: 3,
      nom: 'Tableau_budget.xlsx',
      url: 'http://localhost:8080/documents/3/download',
      dateAjout: new Date(),
    },
  ];

  getIconByType(nomFichier: string): string {
    const ext = nomFichier.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'bi bi-file-earmark-pdf-fill text-danger';
      case 'doc':
      case 'docx':
        return 'bi bi-file-earmark-word-fill text-primary';
      case 'xls':
      case 'xlsx':
        return 'bi bi-file-earmark-excel-fill text-success';
      default:
        return 'bi bi-file-earmark-fill text-secondary';
    }
  }

  getType(nomFichier: string): string {
    const ext = nomFichier.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'PDF';
      case 'doc':
      case 'docx':
        return 'Word';
      case 'xls':
      case 'xlsx':
        return 'Excel';
      default:
        return 'Autre';
    }
  }

  voirDetails(doc: any) {
    console.log('Voir détails du document :', doc);
  }

  supprimerDocument(id: number) {
    console.log('Suppression du document avec ID :', id);
  }

  partagerDocument(document: any) {
    this.dataService.getUtilisateur().subscribe((users) => {
      // Ouverture du dialog de partage
      this.dialog.open(PartageDialogComponent, {
        width: '400px',
        data: {
          document: document,
          utilisateurs: users,
        },
      });
    });
  }

  AllerVersPartage(document: any) {
    this.router.navigate(["'/partage-dialog'"], { state: { document } });
  }
}
