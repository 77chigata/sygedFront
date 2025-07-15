import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-statistique',
  standalone: false,
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent implements OnInit {
  totalDocuments: number=0;
utilisateursNumber:number=0;
  constructor(private dataService: DataService){}
  ngOnInit(): void {
   this.getListDocument();
   this.getListUtilisateur(
    
   )
  }
getListDocument() {
  return this.dataService.getDocument().subscribe(
    (reponse) => {
      const nombreDeLignes = reponse.length;
      console.log('Nombre de documents :', nombreDeLignes);
      // tu peux aussi stocker la valeur dans une variable de composant si besoin
      this.totalDocuments = nombreDeLignes;
    },
    (error) => {
      console.error('Erreur lors de la récupération des documents', error);
    }
  );
}
  getListUtilisateur() {
    return this.dataService.getUtilisateur().subscribe((data) => {
      this.utilisateursNumber = data.length;
     
    });
  }  


}


