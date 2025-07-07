import { Component } from '@angular/core';
import { PartageDialogComponent } from '../partage-dialog/partage-dialog.component';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-mesdoc',
  standalone: false,
  templateUrl: './mesdoc.component.html',
  styleUrl: './mesdoc.component.css',
})
export class MesdocComponent {
getIconClass(arg0: any) {
throw new Error('Method not implemented.');
}
  router: any;
  error: any;
  success: any;
filtreNom: any;
filtreType: any;
documentsFiltres: any;
  allerVersPartage(_t16: {
    id: number;
    nom: string;
    url: string;
    dateDepot: Date;
  }) {
    throw new Error('Method not implemented.');
  }

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  documents: any = [];
  ngOnInit() {
    this.getDocument();
  }
  getDocument() {
    this.dataService.getDocument().subscribe(
      (response: any) => {
        this.documents = response;
        console.log(this.documents);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des documents :', error);
      }
    );
  }

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
