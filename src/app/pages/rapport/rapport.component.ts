import { Component } from '@angular/core';

@Component({
  selector: 'app-rapport',
  standalone: false,
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent {
  documents  = [
  {nom: 'Rapport1', expediteur: 'ange', dateReception: '2025-04-01',statut: 'Validé'},
  {nom: 'Rapport2', expediteur: 'talia', dateReception: '2025-04-02',statut: 'En attante'}
  
]

  // Méthode pour supprimer un document
  supprimerDocument(index: number) {
    if (confirm("Voulez-vous vraiment supprimer ce document ?")) {
      this.documents.splice(index, 1);
    }
  }

  // Variables pour gérer le commentaire
  documentSelectionne: any = null;
  commentaire: string = ""

  ouvrirCommentaire(doc: any) {
    this.documentSelectionne = doc;
    this.commentaire = ""; // Réinitialiser le commentaire
  }
  
  fermerCommentaire() {
    this.documentSelectionne = null;
  }
  
  envoyerCommentaire() {
    if (this.commentaire.trim() === "") {
      alert("Veuillez écrire un commentaire avant d'envoyer !");
      return;
    }
    
    alert(`Commentaire envoyé à ${this.documentSelectionne.expediteur} : ${this.commentaire}`);
    
    // Ici, tu peux ajouter une requête pour stocker/envoyer le commentaire à un serveur
    
    this.fermerCommentaire(); // Fermer la boîte après envoi
  }
  
}

