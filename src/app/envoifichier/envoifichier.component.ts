import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.envoiForm = this.fb.group({
      nomProjet: ['', Validators.required],
     
      message: ['', Validators.required],
      selectedType:['',Validators.required],
      fichierSection: this.fb.group({}) 
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
  const fichierSectionGroup = this.envoiForm.get('fichierSection') as FormGroup;
  Object.keys(fichierSectionGroup.controls).forEach(controlName => {
    fichierSectionGroup.removeControl(controlName);
  });

  this.fields.forEach(field => {
    field.champs.forEach(champ => {
      fichierSectionGroup.addControl(
        champ.nameF,
        new FormControl(null, Validators.required)
      );
    });
  });
}


 onFileChange(event: Event, champName: string): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // Met à jour l’objet local pour l'affichage/aperçu
    this.selectedFiles[champName] = file;

    // Si image, préparer l’aperçu
    

    // Met à jour le formControl dynamique
    const fichierSectionGroup = this.envoiForm.get('fichierSection') as FormGroup;
    fichierSectionGroup.get(champName)?.setValue(file);
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

    console.log(this.envoiForm.value)

    // Ici tu pourras envoyer les fichiers via un service
  }

  getFile(fieldName: string): File | null {
    return this.selectedFiles[fieldName] || null;
  }

  recipient: string = '';
}
