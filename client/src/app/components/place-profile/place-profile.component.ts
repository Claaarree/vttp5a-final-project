import { Component, inject, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { FinalPlace, FinalPost } from '../../models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-profile',
  standalone: false,
  templateUrl: './place-profile.component.html',
  styleUrl: './place-profile.component.css'
})
export class PlaceProfileComponent implements OnInit{
  
  private placeSvc = inject(PlaceService);
  private activatedRoute = inject(ActivatedRoute);
  placeId!: string 
  posts!: FinalPost[];
  place!: FinalPlace;
  mapUrl!: string;
  
  ngOnInit(): void {
    // place id from activatd route 
    this.placeId = this.activatedRoute.snapshot.params['placeId'];
    this.placeSvc.getPostsByPlaceId(this.placeId).then(
      (payload) => this.posts = payload
    ).catch(err => alert(err));
    this.placeSvc.getPlaceByPlaceId(this.placeId).then(
      (place) => {
        this.place = place;
        this.mapUrl = `https://www.onemap.gov.sg/api/staticmap/getStaticImage?layerchosen=default&zoom=17&height=350&width=500&lat=${place.lat}&lng=${place.lng}&points=%5B${place.lat}%2C%20${place.lng}%5D`;
      }
    )

  }

  
}
