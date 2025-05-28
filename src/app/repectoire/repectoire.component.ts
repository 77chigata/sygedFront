import { Component } from '@angular/core';

@Component({
  selector: 'app-repectoire',
  standalone: false,
  templateUrl: './repectoire.component.html',
  styleUrl: './repectoire.component.css'
})
export class RepectoireComponent {

  documents = [
    {
      id: 1,
      nom: 'Fiche_projet.pdf',
      url: 'http://localhost:8080/documents/1/download',
      dateAjout: new Date()
    },
    {
      id: 2,
      nom: 'Contrat_employe.docx',
      url: 'http://localhost:8080/documents/2/download',
      dateAjout: new Date()
    },
    {
      id: 3,
      nom: 'Tableau_budget.xlsx',
      url: 'http://localhost:8080/documents/3/download',
      dateAjout: new Date()
    }
  ];
  
  getIconByType(nomFichier: string): string {
    const ext = nomFichier.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'bi bi-file-earmark-pdf-fill text-danger';
      case 'doc':
      case 'docx': return 'bi bi-file-earmark-word-fill text-primary';
      case 'xls':
      case 'xlsx': return 'bi bi-file-earmark-excel-fill text-success';
      default: return 'bi bi-file-earmark-fill text-secondary';
    }
  }
  
  getType(nomFichier: string): string {
    const ext = nomFichier.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'PDF';
      case 'doc':
      case 'docx': return 'Word';
      case 'xls':
      case 'xlsx': return 'Excel';
      default: return 'Autre';
    }
  }
  
  voirDetails(doc: any) {
    console.log('Voir détails du document :', doc);
  }
  
  supprimerDocument(id: number) {
    console.log('Suppression du document avec ID :', id);
  }
  
  

}
