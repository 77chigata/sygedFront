import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

@Component({
  selector: 'app-formulaire',
  standalone: false,
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css',
})
export class FormulaireComponent {
  erreur: string | undefined;
  user: any;
  departement: any;
  role: any;
  messageSucces: any;
  error: any;
  success: any;
  logout() {
    throw new Error('Method not implemented.');
  }
  credentials: any;
  login() {
    throw new Error('Method not implemented.');
  }
  utilisateur: any;
  ajouterUtilisateur() {
    console.log(this.ajouteForm.value);
  }

  getLisDepartement() {
    return this.dataService.getDepartement().subscribe((data) => {
      this.departement = data;
      console.log(this.departement);
    });
  }
  getLisRole() {
    return this.dataService.getRole().subscribe((data) => {
      this.role = data;
    });
  }
  ajouteForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private formService: FormService,
    private dataService: DataService,
    private dialog: MatDialog,
    private confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.ajouteForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      prenom: ['', Validators.required],

      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      departement: this.fb.group({
        idDepartement: [null, Validators.required],
      }),
      roles: this.fb.array([
        this.fb.group({
          idRole: [null, Validators.required],
        }),
      ]),
    });

    this.getLisDepartement();
    this.getLisRole();
  }
  get rolesFormArray(): FormArray {
    return this.ajouteForm.get('roles') as FormArray;
  }
  ajouterUser() {
    if (
      this.ajouteForm.value.password == this.ajouteForm.value.confirmPassword
    ) {
      this.confirmationDialog
        .openConfirmationDialog(
          'Êtes-vous sûr de vouloir enregistré cet élément ?'
        )
        .subscribe((result) => {
          if (result) {
            this.dataService.saveUtilisateur(this.ajouteForm.value).subscribe({
              next: (response) => {
                // Traiter la réponse ici

                this.dialog
                  .open(SuccessDialogComponent, {
                    data: { message: 'Utilisateur enregistré avec succès' },
                    width: '400px',
                  })
                  .afterClosed()
                  .subscribe((result) => {
                    window.location.reload();
                  });
              },
              error: (error) => {
                // Gérer les erreurs ici
                console.error(
                  "Erreur lors de l'enregistrement de l'utilisateur:",
                  error
                );
              },
            });
          } else {
            // Utilisateur a cliqué "Non"
          }
        });
    }
  }
}
