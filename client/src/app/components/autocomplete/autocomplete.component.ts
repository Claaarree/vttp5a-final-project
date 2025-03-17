import { Component, OnInit, Output } from '@angular/core';
import { Place } from '../../models/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: false,
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent implements OnInit{
  autoComplete!: google.maps.places.Autocomplete;
  selectedPlace!: Place;
  @Output() placeSelected = new Subject<Place>;
  
  async ngOnInit(): Promise<void> {
    await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    this.getAutoComplete();
  }
    
  private getAutoComplete() {
    this.autoComplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement, 
      {componentRestrictions: {country: 'sg'},
      fields: ['name', 'formatted_address', 'place_id', 'adr_address', 'geometry']
      });

    this.autoComplete.addListener('place_changed', () => this.placeChanged());
      
  }
 
  private placeChanged() {
    const place = this.autoComplete.getPlace();
    if (place.geometry) {
      this.selectedPlace = {
        placeId: place.place_id ?? "",
        name: place.name ?? "",
        address: place.formatted_address ?? "", 
        lat: place.geometry.location?.lat() ?? 0,
        lng: place.geometry.location?.lng() ?? 0,
        area: ""
      }
      console.log("in autocomplete: ", this.selectedPlace);
      this.placeSelected.next(this.selectedPlace);
      // 
      console.log(place);
      console.log(place.geometry?.location?.lat())
      console.log(place.geometry?.location?.lng())
      console.log('Place name:', place.name);
      // 
    } else {
      console.log('No place details available');
    }
  }

}
