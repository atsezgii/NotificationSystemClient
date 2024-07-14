import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { LoginModel } from '../Models/login';
import { JwtHelperService } from './jwt-helper.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;
  private tokenCheckSubscription: Subscription;
  private apiUrl =  'https://localhost:7124/api/Auth/Login'; // API URL'nizi buraya ekleyin

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService,private router:Router) {
    const token = localStorage.getItem('accessToken');
    this.currentUserSubject = new BehaviorSubject<string | null>(token ? this.jwtHelper.getUserId(token) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(" this.currentUser", this.currentUser)

        // Token süresini belirli aralıklarla kontrol et
         this.startTokenExpirationCheck();
  }
  private startTokenExpirationCheck(): void {
    this.tokenCheckSubscription = interval(60000).subscribe(() => { // 60 saniyede bir kontrol et
      console.log("interval çalıştı")
      const token = localStorage.getItem('accessToken');
      if (token && this.jwtHelper.isTokenExpired(token)) {
        this.logout();
      }
    });
  }
  login(credentials: LoginModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
    this.router.navigate(['/login']);
  }
  getCurrentUserId(): string | null {
    const token = localStorage.getItem('accessToken');
    console.log("this.jwtHelper.getUserId(token)",this.jwtHelper.getUserId(token))
    return token ? this.jwtHelper.getUserId(token) : null;
  }
}
