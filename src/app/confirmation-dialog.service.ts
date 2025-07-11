import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogConfirComponent } from './dialog-confir/dialog-confir.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

constructor(private dialog: MatDialog) {}

  openConfirmationDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogConfirComponent, {
      width: '400px',
      data: { message },
      disableClose: true,
      panelClass: 'confirmation-dialog-panel'
    });

    return dialogRef.afterClosed();
  }
}
