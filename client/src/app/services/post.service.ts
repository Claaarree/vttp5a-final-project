import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject, switchMap, take } from 'rxjs';
import { FinalPost, PostUpdate, UpdateResult } from '../models/models';
import { UserRepository } from '../state/user.repository';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private httpClient = inject(HttpClient);
  private jwt$!: Observable<string> 
  postGot!: FinalPost;

  constructor(private userRepository: UserRepository) {
    this.jwt$ = this.userRepository.jwt$
  }

  getPostById(postId: string): Promise<FinalPost> {
    return lastValueFrom(this.jwt$.pipe(
          take(1), // Get the latest token value once
          switchMap(token => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          
          return this.httpClient.get<FinalPost>(`/api/post/${postId}`, {headers: headers})
        })))
        .then(payload => this.postGot = payload);
  }

  getAllPostsByUserId(userId: string) {
    return lastValueFrom(this.jwt$.pipe(
          take(1), // Get the latest token value once
          switchMap(token => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          
          return this.httpClient.get<FinalPost[] | UpdateResult>(`/api/posts/${userId}`, {headers: headers});
        })));
  }

  updatePostById(postId: string, update: PostUpdate) {
    return lastValueFrom(this.jwt$.pipe(
          take(1), // Get the latest token value once
          switchMap(token => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          
          return this.httpClient.put<UpdateResult>(`/api/post/update/${postId}`, update, {headers: headers});
        })));
  }

  deletePostById(postId: string, placeId: string) {
    return lastValueFrom(this.jwt$.pipe(
          take(1), // Get the latest token value once
          switchMap(token => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          
          const queryParams: HttpParams = new HttpParams()
              .set("placeId", placeId);
          return this.httpClient.delete(`/api/post/delete/${postId}`, {params: queryParams, headers:headers})
        })));
  }

  savePost(post: FinalPost) {
    return lastValueFrom(this.jwt$.pipe(
      take(1), // Get the latest token value once
      switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
      return this.httpClient.post<UpdateResult>('/api/post/save', post, {headers: headers});
    })));
  }

  unsavePost(postId: string) {
    return lastValueFrom(this.jwt$.pipe(
      take(1), // Get the latest token value once
      switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
      return this.httpClient.post<UpdateResult>('/api/post/unsave', postId, {headers: headers});
    })));
  }
}
