import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASE_URL = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getDepartement(): Observable<any> {
    return this.http.get(`${this.BASE_URL}departement`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getUtilisateur(): Observable<any> {
    return this.http.get(`${this.BASE_URL}utilisateur`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getRole(): Observable<any> {
    return this.http.get(`${this.BASE_URL}role`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getDocument(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}document/all`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders | undefined {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log('JWT token found in local storage:', jwtToken);
      return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    } else {
      console.log('JWT token not found in local storage');
      return undefined;
    }
  }

  saveUtilisateur(User: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}utilisateur/create`, User, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteUser(idUser: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}utilisateur/${idUser}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  partagerDoc(formDoc: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}partage/save`, formDoc, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getDocPartager(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}partage/findEmetteur/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getDocRecu(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}partage/find/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }
  getUtilisateurById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}utilisateur/${id}`, {
      headers: this.createAuthorizationHeader(),
    })
  }
}
