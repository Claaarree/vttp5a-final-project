import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse, NewUser, User } from '../models/models';
import { Observable, take, tap } from 'rxjs';
import { UserRepository } from '../state/user.repository';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private jwt$!: Observable<string> 

  constructor(private userRepository: UserRepository) {
    this.jwt$ = this.userRepository.jwt$
  }

  createUser(newUser: NewUser) {
    return this.httpClient.post('/api/user', newUser);
  }

  sendLoginRequest(u: User): Observable<any> {
    console.log(u)
    return this.httpClient.post<LoginResponse>("/api/user/login", u).pipe(
      tap((response) => {
        this.userRepository.setToken(response.localId, response.idToken, response.refreshToken);
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
        this.httpClient.post("/api/user/logout", {}, {headers: headers})
          .subscribe({
            next: () => {
            console.log('Logout successful');
            const message = "You are now logged out"
            this.userRepository.clearToken(); 
            // Clear tokens on logout
            this.messageService
              .add({ severity: 'info', summary: 'Logout Success', detail: message, key: "tc", life: 3000 });
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Logout failed:', error);
            const message = "Failed to logout..."
            this.messageService
              .add({ severity: 'error', summary: 'Logout Failure', detail: message, key: "tc", life: 3000 });
          }
        });
      } else {
        console.log('No token available for logout.');
        this.userRepository.clearToken();
        this.router.navigate(['/']);
      }
    });
  }
}
