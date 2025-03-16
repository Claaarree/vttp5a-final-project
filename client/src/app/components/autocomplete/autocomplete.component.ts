import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  standalone: false,
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent implements OnInit{
  
  async ngOnInit(): Promise<void> {
    await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    this.getAutoComplete();
  }

  autoComplete!: google.maps.places.Autocomplete;
    
  private getAutoComplete() {
    this.autoComplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement, 
      {componentRestrictions: {country: 'sg'},
      // fields: ['name', 'formatted_address', 'place_id', 'adr_address', 'geometry']
      });

    this.autoComplete.addListener('place_changed', () => this.placeChanged());
      
  }
 
  private placeChanged() {
    const place = this.autoComplete.getPlace();
    if (place.geometry) {
      console.log(place)
      console.log(place.geometry?.location?.lat())
      console.log(place.geometry?.location?.lng())
      console.log('Place name:', place.name);
    } else {
      console.log('No place details available');
    }
  }

}
