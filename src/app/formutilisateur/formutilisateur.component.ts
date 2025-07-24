import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { EchecDialogComponent } from '../echec-dialog/echec-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-formutilisateur',
  standalone: false,
  templateUrl: './formutilisateur.component.html',
  styleUrl: './formutilisateur.component.css'})
export class FormutilisateurComponent implements OnInit{
utilisateur: any;

error=''
loginForm!:FormGroup;
constructor(private router:Router,private fb :FormBuilder,private authservie:AuthService ,private dialog: MatDialog){

}

ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })
}
connexionUtilisateur() {
  console.log(this.loginForm.value)
this.authservie.login(this.loginForm.value).subscribe(
  (response)=>{
    console.log(response)
    if (response!=null) {
      const jwToken= response
      localStorage.setItem('jwt',jwToken)
      localStorage.setItem('userName',this.loginForm.getRawValue().username)
       this.router.navigate(['/admin'])
      
    }
  },(erreur)=>{
    console.log(erreur)
    this.error="mot de passe ou login incorect"
    this.openDailogSucces()
  }
)
}
 openDailogSucces() {
    
    this.dialog
      .open(EchecDialogComponent, {
        data: { message: "Le mot de passe ou le nom d'utilisateur est incorrect" },
        width: '400px',
      })
      
  }
}
