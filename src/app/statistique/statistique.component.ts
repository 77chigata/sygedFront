import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-statistique',
  standalone: false,
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent {

  // 📊 Configuration du graphique en barres (par mois)
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  barChartLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  barChartDatasets = [
    { data: [12, 19, 3, 5, 2, 3, 10, 15, 8, 9, 6, 7], label: 'Rapports reçus' }
  ];

  // 🥧 Configuration du graphique circulaire (par trimestre)
  pieChartLabels = ['T1', 'T2', 'T3', 'T4'];
  pieChartDatasets = [{ data: [30, 25, 20, 25] }];
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true
  };
}


