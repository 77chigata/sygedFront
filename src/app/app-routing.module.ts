import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RapportComponent } from './pages/rapport/rapport.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { EnvoifichierComponent } from './envoifichier/envoifichier.component';
import { FormutilisateurComponent } from './formutilisateur/formutilisateur.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ListeutilisateurComponent } from './listeutilisateur/listeutilisateur.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { RepectoireComponent } from './repectoire/repectoire.component';
import { MesdocComponent } from './mesdoc/mesdoc.component';
import { DocpartagerComponent } from './docpartager/docpartager.component';
import { authGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
  },

  {
    path: 'rapport',
    component: RapportComponent,
    canActivate: [authGuard],
  },

  {
    path: 'statistique',
    component: StatistiqueComponent,
    canActivate: [authGuard],
  },

  {
    path: '',
    component: PageAccueilComponent,
    canActivate: [authGuard],
  },

  {
    path: 'formulaire',
    component: FormulaireComponent,
    canActivate: [authGuard],
  },

  { path: 'listeutilisateur', component: ListeutilisateurComponent },
  { path: 'formulaire-utilisateur/:id', component: FormulaireComponent },

  {
    path: 'envoifichier',
    component: EnvoifichierComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: FormutilisateurComponent,
  },

  {
    path: 'utilisateur',
    component: UtilisateurComponent,
    canActivate: [authGuard],
  },

  {
    path: 'listeutilisateur',
    component: ListeutilisateurComponent,
    canActivate: [authGuard],
  },

  {
    path: 'commentaire',
    component: CommentaireComponent,
    canActivate: [authGuard],
  },

  {
    path: 'repectoire',
    component: RepectoireComponent,
    canActivate: [authGuard],
  },

  {
    path: 'mesdoc',
    component: MesdocComponent,
    canActivate: [authGuard],
  },
  {
    path: 'docpartager',
    component: DocpartagerComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
