import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token;
    throw new Error('Method not implemented.');
  }
  private BASE_URL = 'http://localhost:8080/';
  router: any;
  constructor(private http: HttpClient) {}
  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}login`, loginRequest, {
      responseType: 'text' as 'json',
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
  getUserUtilisateur(): Observable<any> {
    const email = localStorage.getItem('userName');

    return this.http.get<any[]>(`${this.BASE_URL}utilisateur/email/${email}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
