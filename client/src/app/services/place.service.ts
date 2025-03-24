import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FinalPlace } from '../models/models';
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
}
