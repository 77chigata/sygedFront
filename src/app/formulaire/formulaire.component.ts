import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-formulaire',
  standalone: false,
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css',
})
export class FormulaireComponent {
  ajouteForm!: FormGroup;
  formTitle: string = 'Ajouter un utilisateur';
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
 
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formService: FormService,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }
  
 passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
}


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
    }, { 
      validator: this.passwordMatchValidator.bind(this)
     });

    this.getLisDepartement();
    this.getLisRole();
  
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.formTitle = 'Modifier l\'utilisateur'; 
        this.dataService.getUtilisateurById(userId).subscribe((data) => {
        delete data.password;
        delete data.confirmPassword;
        this.ajouteForm.patchValue(data);
        });
      }
    });
  }
  
  get rolesFormArray(): FormArray {
    return this.ajouteForm.get('roles') as FormArray;
  }
  ajouterUser() {
    if (
      this.ajouteForm.value.password !== this.ajouteForm.value.confirmPassword
    ) {
      console.log(this.ajouteForm.value)
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
              this.router.navigate(['/listeutilisateur']);
            });
        },
        error: (error) => {
          // Gérer les erreurs ici
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        }
      });

    }
  }
  
}
