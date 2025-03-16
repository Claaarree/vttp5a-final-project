import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Post, UploadResult } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private httpClient = inject(HttpClient);

  upload(post: Post, filelist: FileList) {
    const formData = new FormData();
    // formData.set('rating', form['rating']);
    // formData.set('review', form['review']);
    formData.append("p", JSON.stringify(post));
    // TODO set the other fields
    Array.from(filelist).forEach(file =>{
      formData.append("data", file)
    })
    // formData.append("file", filelist);
    // for(var idx in images){
    //   formData.set(`file${idx}`, images[idx]);
    // }
    return lastValueFrom(this.httpClient
          .post<string>('/api/post/new', formData)
          // .post<UploadResult>('/api/post/new', formData)
    );
  }
}
