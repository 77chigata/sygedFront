import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formutilisateur',
  standalone: false,
  templateUrl: './formutilisateur.component.html',
  styleUrl: './formutilisateur.component.css'})
export class FormutilisateurComponent implements OnInit{
utilisateur: any;

error=''
loginForm!:FormGroup;
constructor(private router:Router,private fb :FormBuilder,private authservie:AuthService){

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
  }
)
}

}
