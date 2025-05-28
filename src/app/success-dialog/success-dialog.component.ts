import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: false,
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {
constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>) {}
}
