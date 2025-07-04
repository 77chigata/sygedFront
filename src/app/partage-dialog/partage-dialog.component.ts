import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-partage-dialog',
  standalone: false,
  templateUrl: './partage-dialog.component.html',
  styleUrl: './partage-dialog.component.css',
})
export class PartageDialogComponent {
  
  partageForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PartageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  closeDialog() {
    // Logic to close the dialog
  }

  shareDocument() {
    // Logic to share the document
    console.log('Document shared:', this.data);
  }
  ngOnInit() {

    
    // Appel à un service pour charger la liste des utilisateurs si besoin
    this.partageForm = this.fb.group({
      Emetteur: this.fb.group({
        idUtilisateur: ['', Validators.required],
      }),
      document: this.fb.group({
        idDocument: ['', Validators.required],
      }),
      Destinataire: this.fb.group({
        idUtilisateur: ['', Validators.required],
      }),
    });
  }

  onSubmit() {}

  partageDoc() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    console.log('Utilisateur récupéré du localStorage:', user);
    if (user) {
      this.partageForm.get('Emetteur.idUtilisateur')?.setValue(user.id);

      this.partageForm
        .get('document.idDocument')
        ?.setValue(this.data.document.idDocument);
    } else {
      alert('Utilisateur non trouvé dans le localStorage.');
    }
    console.log('Partage du document:', this.partageForm.value);
  }
}
