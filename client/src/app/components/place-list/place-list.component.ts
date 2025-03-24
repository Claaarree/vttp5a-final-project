import { Component, inject, OnInit, Output } from '@angular/core';
import { FinalPlace, MapInfo } from '../../models/models';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place-list',
  standalone: false,
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.css'
})
export class PlaceListComponent implements OnInit{
  
  private placeSvc = inject(PlaceService);
  places!: FinalPlace[];
  allPlaces!: FinalPlace[];
  error!: string;
  stateOptions: any[] = [{ label: 'List view', value: 'list view'},{ label: 'Map View', value: 'map view' }];
  view = 'list view';
  showMap: boolean = false;
  mapUrl: string = '';
  placeMarkers: google.maps.LatLngLiteral[] = [];
  infoContent: string[] = [];
  mapInfo!: MapInfo[];
  // try to get from store?
  areas: string[] = ["All", "Central", "East", "West", "North", "NorthEast"];
  selectedArea!: string

  
  ngOnInit(): void {
    this.placeSvc.getAllPlaces(0).then(
      (payload) => {
        this.allPlaces = payload;
        this.places = this.allPlaces;
        this.loadMap();
      }
    ).catch( err => this.error = err.message);
  }

  protected filterAreas() {
    console.log(this.selectedArea);
    if(this.selectedArea === "All") {
      this.places = this.allPlaces;
    } else{
      this.places = this.allPlaces.filter((place) => place.area === this.selectedArea);
    }
    this.loadMap();
  }

  private loadMap() {
    this.mapInfo = [];
    this.places.forEach((place) => {
      const pinContent = `<h3>${place.name}</h3><hr>
          <h5>${place.address}</h5><br>
          <a style="cursor: pointer;" id="${place.placeId}">View Posts(${place.postCount})</a>`;
      this.mapInfo.push({
        placeId: place.placeId,
        coords: {lat: place.lat, lng: place.lng},
        content: pinContent
      });
    });
  }

  protected getMapUrl(place: FinalPlace) {
    this.showMap = true;
    this.mapUrl = `https://www.onemap.gov.sg/api/staticmap/getStaticImage?layerchosen=default&zoom=17&height=450&width=450&lat=${place.lat}&lng=${place.lng}&points=%5B${place.lat}%2C%20${place.lng}%5D`;
  }



}
