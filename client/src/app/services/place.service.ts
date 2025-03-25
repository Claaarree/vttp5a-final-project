import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FinalPlace, FinalPost, UpdateResult } from '../models/models';
import { lastValueFrom, Observable, switchMap, take } from 'rxjs';
import { UserRepository } from '../state/user.repository';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private httpClient = inject(HttpClient);
  private jwt$!: Observable<string> 
  
  constructor(private userRepository: UserRepository) {
    this.jwt$ = this.userRepository.jwt$
  }

  public getAllPlaces(offset: number) {
    return lastValueFrom(this.jwt$.pipe(
        take(1), // Get the latest token value once
        switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        const params = new HttpParams();
        params.append("offset", offset); 
        return this.httpClient.get<FinalPlace[]>('/api/places/list', {params: params, headers: headers});
      })));
  }

  public getPostsByPlaceId(placeId: string) {
    return lastValueFrom(this.jwt$.pipe(
      take(1), // Get the latest token value once
      switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
      return this.httpClient.get<FinalPost[] | UpdateResult>(`/api/places/${placeId}`, {headers: headers});
    })));
  }

  public getPlaceByPlaceId(placeId: string) {
    return lastValueFrom(this.jwt$.pipe(
      take(1), // Get the latest token value once
      switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
      return this.httpClient.get<FinalPlace>(`/api/places/profile/${placeId}`, {headers: headers});
    })));
  }
}
