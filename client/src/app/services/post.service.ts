import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Subject } from 'rxjs';
import { FinalPost, PostUpdate, UpdateResult } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private httpClient = inject(HttpClient);
  postGot!: FinalPost;

  getPostById(postId: string): Promise<FinalPost> {
    return lastValueFrom(this.httpClient.get<FinalPost>(`/api/post/${postId}`))
      .then(payload => this.postGot = payload);
  }

  updatePostById(postId: string, update: PostUpdate) {
    return lastValueFrom(this.httpClient.put<UpdateResult>(`/api/post/update/${postId}`, update));
  }

  deletePostById(postId: string, placeId: string) {
    const queryParams: HttpParams = new HttpParams()
        .set("placeId", placeId);
    return lastValueFrom(this.httpClient.delete(`/api/post/delete/${postId}`, {params: queryParams}))
  }
}
