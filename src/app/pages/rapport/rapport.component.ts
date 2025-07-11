import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Document } from '../../models/document';

@Component({
  selector: 'app-rapport',
  standalone: false,
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent {
constructor(private dataService: DataService){}
  documents: Document[] = [];

  // Propriétés pour le filtrage
  filtreNom: string = '';
  filtreType: string = '';

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

  // Getter pour les documents filtrés
  get documentsFiltres(): Document[] {
    return this.documents.filter(document => {
      const matchNom = document.nomDocument.toLowerCase().includes(this.filtreNom.toLowerCase());
      const matchType = !this.filtreType || document.typeDocument?.nomType === this.filtreType;
      return matchNom && matchType;
    });
  }

  // Méthode pour obtenir la classe CSS du statut
  getStatutClass(statut: string): string {
    switch (statut) {
      case 'Disponible':
        return 'statut-disponible';
      case 'Verrouillé':
        return 'statut-verrouille';
      case 'En cours':
        return 'statut-en-cours';
      default:
        return '';
    }
  }

  // Méthode pour obtenir la classe d'icône selon le type
  getIconClass(typeDocument: string): string {
    if (!typeDocument) return 'document';
    
    const type = typeDocument.toLowerCase();
    if (type.includes('pdf')) return 'document';
    if (type.includes('word') || type.includes('doc')) return 'document';
    if (type.includes('excel') || type.includes('xls')) return 'document';
    if (type.includes('powerpoint') || type.includes('ppt')) return 'document';
    if (type.includes('image') || type.includes('jpg') || type.includes('png')) return 'image';
    return 'document';
  }

  // Méthodes pour les actions
  ouvrirDocument(document: Document): void {
    console.log('Ouvrir document:', document);
    // Implémentation pour ouvrir le document
    // Peut utiliser document.contenuFichier pour afficher le contenu
  }

  telechargerDocument(document: Document): void {
    console.log('Télécharger document:', document);
    // Implémentation pour télécharger le document
    // Utiliser document.contenuFichier pour créer le fichier à télécharger
  }

  supprimerDocument(idDocument: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      // Appel à l'API pour supprimer le document
      console.log('Supprimer document, ID:', idDocument);
      // Exemple: this.dataService.supprimerDocument(idDocument).subscribe(...)
      this.documents = this.documents.filter(d => d.idDocument !== idDocument);
    }
  }
  
}

