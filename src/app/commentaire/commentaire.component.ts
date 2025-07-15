import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-commentaire',
  standalone: false,
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.css'
})
export class CommentaireComponent implements OnInit {
supprimerCommentaire(arg0: number) {
throw new Error('Method not implemented.');
}
constructor(private dataServices:DataService){

}
  ngOnInit(): void {
    this.getDocPartager()
  }
 partages :any=[]
  
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
  getDocPartager(){
     const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.dataServices.getDocRecu(user.id).subscribe(
       (response) => {
         console.log(response)
         this.partages=response
        },
        (erreur) => {
          console.log(erreur);
        }
    )
  }
}
