import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-echec-dialog',
  standalone: false,
  templateUrl: './echec-dialog.component.html',
  styleUrl: './echec-dialog.component.css'
})
export class EchecDialogComponent {
 constructor(
    public dialogRef: MatDialogRef<EchecDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closePopup(){
    this.dialogRef.close(); // Ferme simplement le dialog
  }
}
