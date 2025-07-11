import { Component } from '@angular/core';

@Component({
  selector: 'app-docpartager',
  standalone: false,
  templateUrl: './docpartager.component.html',
  styleUrl: './docpartager.component.css'
})
export class DocpartagerComponent {
documents: any;
supprimerDocument(arg0: any) {
throw new Error('Method not implemented.');
}

  partages = [
    {
      id: 1,
      destinataire: 'chigata',
      datePartage: new Date(),
      document: {
        nom: 'excel',
        url: 'http://localhost:8080/documents/partages/1'
      }
    },
    {
      id: 2,
      destinataire: 'chigata',
      datePartage: new Date(),
      document: {
        nom: 'pdf',
        url: 'http://localhost:8080/documents/partages/2'
      }
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
  
  voirDetails(partage: any) {
    console.log('Voir détails du partage :', partage);
  }
  
  annulerPartage(id: number) {
    console.log('Annulation du partage ID :', id);
  }
  
}
