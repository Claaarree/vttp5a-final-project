import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FinalPost } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private httpClient = inject(HttpClient);

  getPostById(postId: string): Promise<FinalPost> {
    return lastValueFrom(this.httpClient.get<FinalPost>(`/api/post/${postId}`));
  }
}
