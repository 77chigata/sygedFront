import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-doc',
  standalone: false,
  templateUrl: './ajout-doc.component.html',
  styleUrl: './ajout-doc.component.css',
})
export class AjoutDocComponent {
  constructor(public dialogRef: MatDialogRef<AjoutDocComponent>) {}
}
