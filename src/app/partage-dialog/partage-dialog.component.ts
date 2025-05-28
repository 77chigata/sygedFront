import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-partage-dialog',
  standalone: false,
  templateUrl: './partage-dialog.component.html',
  styleUrl: './partage-dialog.component.css'
})
export class PartageDialogComponent {
username: any;
document: any;
partageForm!: FormGroup
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
  const nav = history.state;
  this.document = nav.document;
  // Appel à un service pour charger la liste des utilisateurs si besoin
  this.partageForm = this.fb.group({
    idUtilisateur : ["", Validators.required],
    idFichier:["",Validators.required]
  })

  this.partageForm.value.idFichier=this.data.document.id
}

onSubmit(){

}
}
