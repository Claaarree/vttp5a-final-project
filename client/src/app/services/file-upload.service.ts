import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Place, Post, UploadResult } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpClient = inject(HttpClient);

  upload(post: Post, place: Place, filelist: FileList) {
    const formData = new FormData();
    formData.append("post", JSON.stringify(post));
    formData.append("place", JSON.stringify(place));
    // TODO set the other fields
    Array.from(filelist).forEach(file =>{
      formData.append("data", file)
    })
   
    return lastValueFrom(this.httpClient
          .post<string>('/api/post/new', formData)
          // .post<UploadResult>('/api/post/new', formData)
    );
  }
}
