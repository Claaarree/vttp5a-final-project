import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FinalPlace, FinalPost } from '../models/models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private httpClient = inject(HttpClient);

  public getAllPlaces(offset: number) {
    const params = new HttpParams();
    params.append("offset", offset);

    return lastValueFrom(this.httpClient.get<FinalPlace[]>('/api/places/list', {params: params}));
  }

  public getPostsByPlaceId(placeId: string) {
    return lastValueFrom(this.httpClient.get<FinalPost[]>(`/api/places/${placeId}`));
  }

  public getPlaceByPlaceId(placeId: string) {
    return lastValueFrom(this.httpClient.get<FinalPlace>(`/api/places/profile/${placeId}`));
  }
}
