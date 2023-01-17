import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}
  privilage= new Number();
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  getPrivilage()
  {
    return this.privilage;
      
    
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.privilage=2;
      return of({ name: 'Solomahery', email: 'admin@gmail.com' ,privilage:2});
    }
    if (email === 'admin@gmail.com' && password === 'admin321') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.privilage=3;
      return of({ name: 'Solomahery', email: 'admin@gmail.com',privilage:3 });
    }
    return throwError(new Error('Failed to login'));
  }
}
