import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASE_URL = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

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

  saveUtilisateur(User: any, value: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}utilisateur/create`, User, {
      headers: this.createAuthorizationHeader(),
    });
  }
}
