import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http:HttpClient) {}
  logAdmin({ usernameAdmin, passwordAdmin }: any): Observable<any>{
    return this.http.post<any>("/api/admin/login",{ usernameAdmin, passwordAdmin });
  }
  addAdmin({ usernameAdmin, passwordAdmin,roleAdmin }: any): Observable<any>{
    return this.http.post<any>("/api/admin/add",{ usernameAdmin, passwordAdmin,roleAdmin});
  }
  setPrivilage(a: string):void{
    localStorage.setItem('privilage', a);
  }
  getPrivilage() {
    return Number(localStorage.getItem('privilage'));
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }



  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'client@gmail.com' && password === 'client') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('1');
      return of({ name: 'Solomahery', email: 'admin@gmail.com' });
    }
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('2');
      return of({ name: 'Solomahery', email: 'admin@gmail.com'});
    }
    if (email === 'admin@gmail.com' && password === 'admin321') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('3');
      return of({ name: 'Solomahery', email: 'admin@gmail.com'});
    }
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('4');
      return of({ name: 'Solomahery', email: 'admin@gmail.com'});
    }
    return throwError(new Error('Failed to login'));
  }
}
