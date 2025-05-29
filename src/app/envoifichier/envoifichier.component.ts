import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
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
      selectedType: ['', Validators.required],
      fichierSection: this.fb.group({}),
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
    const fichierSectionGroup = this.envoiForm.get(
      'fichierSection'
    ) as FormGroup;
    Object.keys(fichierSectionGroup.controls).forEach((controlName) => {
      fichierSectionGroup.removeControl(controlName);
    });

    this.fields.forEach((field) => {
      field.champs.forEach((champ) => {
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
      const fichierSectionGroup = this.envoiForm.get(
        'fichierSection'
      ) as FormGroup;
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

  async sendDocument(documentData: any, apiUrl: string): Promise<any> {
    try {
      // 1. Vérifier l'existence d'un jeton valide
      let token = localStorage.getItem('jwt');
      console.log('Token from localStorage:', token);

      // 2. Si aucun jeton ou si le jeton a expiré, en obtenir un nouveau
      if (!token || this.isTokenExpired(token)) {
        const credentials = {
          username: 'chigata@gmail.com',
          password: '1234',
        };

        token = await this.getToken('http://localhost:8080/login', credentials);
        localStorage.setItem('jwt', token);
      }

      documentData.fichierSection = this.fileToBytes(
        documentData.fichierSection.rapport_stage
      );
      console.log(documentData);
      // 3. Faire une requête authentifiée
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(documentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending document:', error);
      throw error; // Relancer l’erreur pour laisser l’appelant la gérer
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true; // Si la décodification échoue, supposer qu’il est expiré
    }
  }

  async getToken(apiUrl: string, payload: object): Promise<string> {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajouter d'autres en-têtes si nécessaire
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      console.log('Response data:', response);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      // Extraire le jeton à partir des différents formats de réponse possibles
      const token =
        responseData?.token || responseData?.access_token || responseData;

      if (!token) {
        throw new Error('No token received in response');
      }

      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error; // Relancer l'exception pour laisser l'appelant la gérer
    }
  }

  fileToBytes(file: File): Promise<Uint8Array> {
    return file.arrayBuffer().then((buffer) => {
      const bytes = new Uint8Array(buffer);
      return bytes;
    });
  }

  onSubmit() {
    this.sendDocument(
      this.envoiForm.value,
      'http://localhost:8080/document/save'
    );
  }

  getFile(fieldName: string): File | null {
    return this.selectedFiles[fieldName] || null;
  }

  recipient: string = '';
}
