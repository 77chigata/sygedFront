export interface Document {
idDocument: number;
  nomDocument: string;
  contenuFichier: any;
  dateDepot: Date;
  utilisateur: {
    id: number;
    nom: string;
    email: string;
  };
  typeDocument: {
    id: number;
    nomType: string;
    description: string;
  };
  projet: {
    id: number;
    nomProjet: string;
    description: string;
  };
}

