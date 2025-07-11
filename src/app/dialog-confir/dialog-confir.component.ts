import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confir',
  standalone: false,
  templateUrl: './dialog-confir.component.html',
  styleUrl: './dialog-confir.component.css'
})
export class DialogConfirComponent {
constructor(
    public dialogRef: MatDialogRef<DialogConfirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}


  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
