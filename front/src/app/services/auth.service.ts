import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  logAdmin({ username, password }: any): Observable<any> {
    this.setTokenAdmin('abcdefghijklmnopqrstuvwxyz');
    return this.http.post<any>('/api/admin/login', { username, password });
  }
  logClient({ email, password }: any): Observable<any> {
    this.setTokenClient('abcdefghijklmnopqrstuvwxyz');
    return this.http.post<any>('/api/client/login', { email, password });
    
  }
  getAdmin(): Observable<any> {
    return this.http.get<any>('/api/admin/');
  }
  getClient(): Observable<any> {
    return this.http.get<any>('/api/client/');
  }
  getAllCar(): Observable<any> {
    return this.http.get<any>('/api/admin/car');
  }
  getAllCarReception(): Observable<any> {
    return this.http.get<any>('/api/admin/car/reception');
  }
  getCarOut(): Observable<any> {
    return this.http.get<any>('/api/admin/car/sortie');
  }
  getAllFacture(): Observable<any> {
    return this.http.get<any>('/api/admin/facture');
  }
  //--------------not tested yet---------------
  getFactureTF(valeur: any): Observable<any> {
    return this.http.get<any>('/api/admin/facture/'+ valeur);
  }
  //--------------------------------------------

  getOneCar(id: any): Observable<any> {
    return this.http.get<any>('/api/admin/car/' + id);
  }

  getAllClient(): Observable<any> {
    return this.http.get<any>('/api/admin/client');
  }

  getOneClient(_id: any): Observable<any> {
    return this.http.get<any>('/api/admin/client/'+ _id);
  }


  //--------------not tested yet---------------
  addCarReparation({ numero }: any): Observable<any> {
    return this.http.post<any>('/api/admin/car/reparation/:numero', { numero });
  }
  //--------------------------------------------

  //--------------not tested yet---------------
  addCarFacture({ idVoiture }: any): Observable<any> {
    return this.http.post<any>('/api/admin/car/facture/:idVoiture', {
      idVoiture,
    });
  }
  //--------------------------------------------
  addAdmin({ usernameAdmin, passwordAdmin, roleAdmin }: any): Observable<any> {
    return this.http.post<any>('/api/admin/add', {
      usernameAdmin,
      passwordAdmin,
      roleAdmin,
    });
  }
  logoutAdmin(): Observable<any> {
    return this.http.post<any>('/api/admin/logout', null);
  }
  addClient({
    username,
    password,
    nom,
    prenom,
    adress,
    phone,
    email,
  }: any): Observable<any> {
    return this.http.post<any>('/api/client/subscribe', {
      username,
      password,
      nom,
      prenom,
      adress,
      phone,
      email,
    });
  }
  addCarClient({ numero, marque, modele, annee }: any): Observable<any> {
    return this.http.post<any>('/api/client/car', {
      numero,
      marque,
      modele,
      annee,
    });
  }

  logoutClient(): Observable<any> {
    return this.http.post<any>('/api/client/logout', null);
  }
  setPrivilage(a: string): void {
    localStorage.setItem('privilage', a);
  }
  getPrivilage() {
    return Number(localStorage.getItem('privilage'));
  }
  setTokenClient(token: string): void {
    localStorage.setItem('tokenClient', token);
  }
  setTokenAdmin(token: string): void {
    localStorage.setItem('tokenAdmin', token);
  }

  getTokenClient(): string | null {
    return localStorage.getItem('tokenClient');
  }
  getTokenAdmin(): string | null {
    return localStorage.getItem('tokenAdmin');
  }

  isLoggedInClient() {
    return this.getTokenClient() !== null;
  }
  isLoggedInAdmin() {
    return this.getTokenAdmin() !== null;
  }
  removeAllToken(){
    localStorage.removeItem('tokenClient');
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('token');
  }
  logoutTokenClient() {
    localStorage.removeItem('tokenClient');
    this.router.navigate(['home']);
  }
  logoutTokenAdmin() {
    localStorage.removeItem('tokenAdmin');
    this.router.navigate(['home']);
  }

  /* login({ email, password }: any): Observable<any> {
    if (email === 'client@gmail.com' && password === 'client') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('1');
      return of({ name: 'Solomahery', email: 'admin@gmail.com' });
    }
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('2');
      return of({ name: 'Solomahery', email: 'admin@gmail.com' });
    }
    if (email === 'admin@gmail.com' && password === 'admin321') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('3');
      return of({ name: 'Solomahery', email: 'admin@gmail.com' });
    }
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setPrivilage('4');
      return of({ name: 'Solomahery', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  } */
}
