import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RapportComponent } from './pages/rapport/rapport.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { BaseChartDirective } from 'ng2-charts';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';

import { FormulaireComponent } from './formulaire/formulaire.component';
import { EnvoifichierComponent } from './envoifichier/envoifichier.component';
import { FormutilisateurComponent } from './formutilisateur/formutilisateur.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ListeutilisateurComponent } from './listeutilisateur/listeutilisateur.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { RepectoireComponent } from './repectoire/repectoire.component';
import { DocpartagerComponent } from './docpartager/docpartager.component';
import { MesdocComponent } from './mesdoc/mesdoc.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarUtilisateurComponent } from './sidebar-utilisateur/sidebar-utilisateur.component';
import { HeaderUtilisateurComponent } from './header-utilisateur/header-utilisateur.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { PartageDialogComponent } from './partage-dialog/partage-dialog.component';
import { AjoutDocComponent } from './ajout-doc/ajout-doc.component';
import { DialogConfirComponent } from './dialog-confir/dialog-confir.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RapportComponent,
    StatistiqueComponent,
    PageAccueilComponent,

    FormulaireComponent,
    EnvoifichierComponent,
    FormutilisateurComponent,
    UtilisateurComponent,
    ListeutilisateurComponent,
    CommentaireComponent,
    RepectoireComponent,
    DocpartagerComponent,
    MesdocComponent,
    SidebarComponent,
    HeaderComponent,
    SidebarUtilisateurComponent,
    HeaderUtilisateurComponent,
    SuccessDialogComponent,
    PartageDialogComponent,
    AjoutDocComponent,
    DialogConfirComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BaseChartDirective,
    
    MatDialogModule,
    MatButtonModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  
})


export class AppModule { }

