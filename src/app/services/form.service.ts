import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  saveDocument(value: any) {
    throw new Error('Method not implemented.');
  }
  private BASE_URL = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  saveUtilisateur(User: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}utilisateur/create`, User, {
      headers: this.createAuthorizationHeader(),
    });
  }
  addDocument(document: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}document/save`, document, {
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
}
