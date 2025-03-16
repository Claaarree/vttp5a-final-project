import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient)

  sendLoginRequest(u: User): Observable<any> {
    console.log(u)
    return this.httpClient.post("http://localhost:8080/api/user/login", u)
  }

  // signInWithGoogle() {
  //   this.httpClient.get("http://localhost:8080/login")
  // }
}
