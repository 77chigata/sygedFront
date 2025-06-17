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
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
  },

  {
    path: 'rapport',
    component: RapportComponent,
  },

  {
    path: 'statistique',
    component: StatistiqueComponent,
  },

  {
    path: '',
    component: PageAccueilComponent,
  },

  {
    path: 'formulaire',
    component: FormulaireComponent,
  },

  { path: 'formulaire/:id', component: FormulaireComponent }, // modification

  {
    path: 'envoifichier',
    component: EnvoifichierComponent,
  },
  {
    path: 'login',
    component: FormutilisateurComponent,
  },

  {
    path: 'utilisateur',
    component: UtilisateurComponent,
  },

  {
    path: 'listeutilisateur',
    component: ListeutilisateurComponent,
  },

  {
    path: 'commentaire',
    component: CommentaireComponent,
  },

  {
    path: 'repectoire',
    component: RepectoireComponent,
  },

  {
    path: 'mesdoc',
    component: MesdocComponent,
  },
  {
    path: 'docpartager',
    component: DocpartagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
