import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, switchMap, take } from 'rxjs';
import { Place, Post, UploadResult } from '../models/models';
import { UserRepository } from '../state/user.repository';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpClient = inject(HttpClient);
  private jwt$!: Observable<string> 
    
  constructor(private userRepository: UserRepository) {
    this.jwt$ = this.userRepository.jwt$
  }

  upload(post: Post, place: Place, filelist: FileList) {
    const formData = new FormData();
    formData.append("post", JSON.stringify(post));
    formData.append("place", JSON.stringify(place));
    Array.from(filelist).forEach(file =>{
      formData.append("data", file)
    })

    return lastValueFrom(this.jwt$.pipe(
          take(1), // Get the latest token value once
          switchMap(token => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          
          return this.httpClient.post<UploadResult>('/api/post/new', formData, {headers: headers});
        })));
  }
}
