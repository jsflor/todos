import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface RegisterResponse {
  id: number;
  email: string;
  password: string;
}

type LoginResponse = string

interface User {
  email: string;
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5248/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize with user from localStorage if exists
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}/login`, { email, password }, { headers, responseType: 'text' }).pipe(
      tap(response => {
        console.log("🚀 ~ AuthService ~ login ~ response:", response)
        const user = { email, token: response };
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', response);
        this.currentUserSubject.next(user);
      })
    );
  }

  register(email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, { email, password }).pipe(
      tap(response => {
        console.log("🚀 ~ AuthService ~ register ~ response:", response)
        // const user = { email, token: response.token };
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // localStorage.setItem('authToken', response.token);
        // this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}