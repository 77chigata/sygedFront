import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router

  ) { }
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
      emetteur: this.fb.group({
        id: ['', Validators.required],
      }),
      document: this.fb.group({
        idDocument: ['', Validators.required],
      }),
      destinataire: this.fb.group({
        id: [null, Validators.required],
      }),
    });
  }
    onDestinataireChange() {
    this.partageForm.get('destinataire.id')?.valueChanges.subscribe(value => {
      console.log('Destinataire sélectionné:', value);
      // Traiter la valeur ici
    });
  }

  onSubmit() { }

  partageDoc() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    console.log('Utilisateur récupéré du localStorage:', user);
    if (user) {
      this.partageForm.get('emetteur.id')?.setValue(user.id);

      this.partageForm
        .get('document.idDocument')
        ?.setValue(this.data.document.idDocument);
      console.log(this.partageForm.value)
      this.dataService.partagerDoc(this.partageForm.value).subscribe(

        (response) => {
          this.openDailogSucces();
        },
        (erreur) => {
          console.log(erreur);
        }
      )
    } else {
      alert('Utilisateur non trouvé dans le localStorage.');
    }
    console.log('Partage du document:', this.partageForm.value);
  }

  openDailogSucces() {
    this.dialog
      .open(SuccessDialogComponent, {
        data: { message: 'Le document a été partager avec succès !' },
        width: '400px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.router.navigate(['/docpartager']);
      });
  }
}

