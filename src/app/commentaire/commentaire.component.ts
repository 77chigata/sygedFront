import { Component } from '@angular/core';

@Component({
  selector: 'app-commentaire',
  standalone: false,
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent {
supprimerCommentaire(arg0: number) {
throw new Error('Method not implemented.');
}
repondreCommentaire(_t14: { id: number; contenu: string; auteur: string; date: Date; document: { id: number; nom: string; }; }) {
throw new Error('Method not implemented.');
}
getIconByType(nomFichier: string): string {
  const extension = nomFichier.split('.').pop()?.toLowerCase();
  switch (extension) {
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


commentaires = [
  {
    id: 1,
    contenu: 'rependre.',
    auteur: 'Talia',
    date: new Date(),
    document: {
      id: 101,
      nom: 'Rapport_Annuel_2024.pdf',
      url: 'http://localhost:8080/documents/101/download'  // ou un lien vers un stockage cloud
    }
  },
  // autres commentaires...
];

  
}
