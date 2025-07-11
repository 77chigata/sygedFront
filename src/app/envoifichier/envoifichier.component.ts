import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { FormService } from '../services/form.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envoifichier',
  standalone: false,
  templateUrl: './envoifichier.component.html',
  styleUrl: './envoifichier.component.css',
})
export class EnvoifichierComponent implements OnInit {
  envoiForm!: FormGroup;
  types = [
    { value: 'rapport de stage', label: 'Rapport de stage' },
    { value: 'projet', label: 'Rapport de projet de développement' },
  ];
  fileBytes: any;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.envoiForm = this.fb.group({
      nomProjet: ['', Validators.required],

      message: ['', Validators.required],
      selectedType: ['', Validators.required],
      document: this.fb.group({}),
    });
  }

  nameFichier: string = '';
  fields: {
    name: string;
    label: string;
    champs: { namechamp: string; nameF: string; fichier: string }[];
  }[] = [];
  selectedFiles: { [key: string]: File | null } = {};
  previewImages: { [key: string]: string } = {}; // Pour stocker les URLs d'aperçu d'images

  onTypeChange(): void {
    const selectedType = this.envoiForm.value.selectedType;

    switch (selectedType) {
      case 'rapport de stage':
        this.fields = [
          {
            name: 'rapport',
            label: 'Thème de rapport de stage',
            champs: [
              {
                namechamp: 'Rapport de stage',
                nameF: 'rapport_stage', // identifiant unique
                fichier: '',
              },
            ],
          },
        ];
        break;

      case 'projet':
        this.fields = [
          {
            name: 'resume',
            label: 'Résumé du projet',
            champs: [
              {
                namechamp: 'Cahier de charge',
                nameF: 'cahier_charge',
                fichier: '',
              },
              {
                namechamp: 'Document fonctionnel et technique',
                nameF: 'doc_fonctionnel_technique',
                fichier: '',
              },
              {
                namechamp: 'Guide utilisateur',
                nameF: 'guide_utilisateur',
                fichier: '',
              },
            ],
          },
        ];
        break;

      default:
        this.fields = [];
    }

    this.selectedFiles = {};
    this.previewImages = {};

    // Ajouter les FormControls dynamiquement
    const fichierSectionGroup = this.envoiForm.get('document') as FormGroup;
    Object.keys(fichierSectionGroup.controls).forEach((controlName) => {
      fichierSectionGroup.removeControl(controlName);
    });

    this.fields.forEach((field) => {
      field.champs.forEach((champ) => {
        fichierSectionGroup.addControl(
          champ.nameF,
          this.fb.group({
            nomFichier: [null, Validators.required],
            contenuFichier: [null, Validators.required],
          })
        );
      });
    });
  }

  onFileChange(event: Event, champName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFiles[champName] = file;

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const contenu = base64String.split(',')[1]; // Extraire uniquement la partie base64

        const fichierSectionGroup = this.envoiForm.get('document') as FormGroup;
        const champGroup = fichierSectionGroup.get(champName) as FormGroup;

        if (champGroup) {
          champGroup.get('nomFichier')?.setValue(file.name);
          champGroup.get('contenuFichier')?.setValue(contenu);
        } else {
          console.warn(
            `Le groupe ${champName} n'existe pas dans le formulaire`
          );
        }
      };

      reader.readAsDataURL(file);
    }
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  isPdf(file: File): boolean {
    return file.type === 'application/pdf';
  }

  isExcel(file: File): boolean {
    return file.name.endsWith('.xlsx');
  }

  isWord(file: File): boolean {
    return file.name.endsWith('.docx');
  }

  previewFile(fieldName: string) {
    const file = this.selectedFiles[fieldName];
    if (file) {
      if (this.isImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImages[fieldName] = reader.result as string;
        };
        reader.readAsDataURL(file); // Pour l'aperçu image
      } else if (this.isPdf(file)) {
        // Pour un PDF, on peut simplement ouvrir dans une nouvelle fenêtre
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
      } else if (this.isExcel(file) || this.isWord(file)) {
        // Pour Word ou Excel, on permet d'ouvrir dans une nouvelle fenêtre ou téléchargement
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
      }
    }
  }

  onSubmit() {
    console.log(this.envoiForm.value);
    this.formService.addDocument(this.envoiForm.value).subscribe(
      (response) => {
        this.openDailogSucces();
      },
      (erreur) => {
        console.log(erreur);
      }
    );
  }

  openDailogSucces() {
    this.dialog
      .open(SuccessDialogComponent, {
        data: { message: 'Le document a été envoyé avec succès !' },
        width: '400px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.router.navigate(['/mesdoc']);
      });
  }
}
