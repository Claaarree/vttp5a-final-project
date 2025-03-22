import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse, User } from '../models/models';
import { catchError, Observable, take, tap } from 'rxjs';
import { TokenStore } from '../state/token.store';
import { TokenQuery } from '../state/token.query';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private tokenStore = inject(TokenStore);
  private jwt$!: Observable<string> 

  constructor(private tokenQuery: TokenQuery) {
    this.jwt$= this.tokenQuery.getJwtToken();
  }


  sendLoginRequest(u: User): Observable<any> {
    console.log(u)
    return this.httpClient.post<LoginResponse>("/api/user/login", u).pipe(
      tap((response) => {
        this.tokenStore.setToken(response.idToken, response.refreshToken);
      })
    )
  }

  logout(): void {
    this.jwt$.pipe(
      take(1) // Get the latest token value once
    ).subscribe(token => {
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        this.httpClient.post("/api/user/logout", headers)
          .subscribe({
            next: () => {
            console.log('Logout successful');
            this.tokenStore.clearToken(); 
            // Clear tokens on logout
          
          },
          error: (error) => {
            console.error('Logout failed:', error);
          }
        });
      } else {
        console.log('No token available for logout.');
        this.tokenStore.clearToken();
        // Optionally redirect the user, etc.
      }
    });
  }
}
