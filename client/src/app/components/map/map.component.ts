import { Component, OnInit, ViewChild } from '@angular/core';
import { MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  async ngOnInit(): Promise<void> {
    await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    this.getLocation();
  }

  content: string[] = ["1", "2", "3"];
  
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    // center : { lat: 1.3521, lng: 103.8198 },
    zoom : 12
  };

  center: google.maps.LatLngAltitudeLiteral = {
    lat: 1.3521, lng: 103.8198,
    altitude: 0
  };

  markers: google.maps.LatLngLiteral[] = [
    { lat: 1.3521, lng: 103.8198 }, // coords of singapore
    {lat: 1.347924, lng: 103.8798459},
    {lat: 12.879721, lng: 121.774017}
  ];



  protected openInfoWindow(marker: MapAdvancedMarker, idx: number) {
    console.log(idx)
    this.infoWindow.options = {
      content: this.content[idx]
    }
    this.infoWindow.open(marker)
  }

  protected getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.center = {lat: pos.lat, lng: pos.lng, altitude: 0}
          console.log("got location!")
          console.log(pos.lat , pos.lng)
          console.log(this.center)
        },
        () => {
          console.log("couldnt get location!")
        }
      )
    }
  }
}


// {address_components: Array(6), adr_address: '51 Old Airport Road, <span class="street-address">…re</span> <span class="postal-code">390051</span>', business_status: 'OPERATIONAL', current_opening_hours: {…}, formatted_address: '51 Old Airport Road, Lor 21A Geylang, #01-39, Singapore 390051', …}
// address_components: 
// Array(6)
// 0: {long_name: '#01-39', short_name: '#01-39', types: Array(1)}
// 1: {long_name: 'Lor 21A Geylang', short_name: 'Lor 21A Geylang', types: Array(1)}
// 2: {long_name: 'Geylang', short_name: 'Geylang', types: Array(2)}
// 3: {long_name: 'Singapore', short_name: 'Singapore', types: Array(2)}
// 4: {long_name: 'Singapore', short_name: 'SG', types: Array(2)}
// 5: {long_name: '390051', short_name: '390051', types: Array(1)}
// length: 6
// adr_address: "51 Old Airport Road, <span class=\"street-address\">Lor 21A Geylang</span>, #01-39, <span class=\"country-name\">Singapore</span> <span class=\"postal-code\">390051</span>"
// business_status: "OPERATIONAL"
// current_opening_hours: 
// open_now: true
// periods: 
// (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// weekday_text: 
// Array(7)
// 0: "Monday: 8:00 am – 8:00 pm"
// 1: "Tuesday: 8:00 am – 8:00 pm"
// 2: "Wednesday: 8:00 am – 8:00 pm"
// 3: "Thursday: 8:00 am – 8:00 pm"
// 4: "Friday: 8:00 am – 8:00 pm"
// 5: "Saturday: Closed"
// 6: "Sunday: 8:00 am – 8:00 pm"
// length: 7
// formatted_address: 
// "51 Old Airport Road, Lor 21A Geylang, #01-39, Singapore 390051"
// formatted_phone_number: "8700 5938"
// geometry: 
// {location: {…}, viewport: {…}}
// html_attributions: 
// []
// icon: 
// "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"
// icon_background_color: 
// "#FF9E67"
// icon_mask_base_uri: 
// "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet"
// international_phone_number: "+65 8700 5938"
// name: "Sky JB Mian Fen Kueh"
// opening_hours: 
// {periods: Array(6), weekday_text: Array(7), isOpen: ƒ}
// photos: 
// Array(10)
// 0: {height: 2576, html_attributions: Array(1), width: 1449, getUrl: ƒ}
// 1: {height: 1216, html_attributions: Array(1), width: 2160, getUrl: ƒ}
// 2: {height: 360, html_attributions: Array(1), width: 640, getUrl: ƒ}
// 3: {height: 3024, html_attributions: Array(1), width: 4032, getUrl: ƒ}
// 4: {height: 4032, html_attributions: Array(1), width: 3024, getUrl: ƒ}
// 5: {height: 3016, html_attributions: Array(1), width: 4021, getUrl: ƒ}
// 6: {height: 2001, html_attributions: Array(1), width: 1501, getUrl: ƒ}
// 7: {height: 4032, html_attributions: Array(1), width: 3024, getUrl: ƒ}
// 8: {height: 4032, html_attributions: Array(1), width: 3024, getUrl: ƒ}
// 9: {height: 901, html_attributions: Array(1), width: 902, getUrl: ƒ}
// length: 10
// place_id: "ChIJU412uYQZ2jERcCoPNxOleVY"
// plus_code: {compound_code: '8V5P+78 Singapore', global_code: '6PH58V5P+78'}
// rating: 4.6
// reference: "ChIJU412uYQZ2jERcCoPNxOleVY"
// reviews: (5) [{…}, {…}, {…}, {…}, {…}]
// types: (4) ['restaurant', 'food', 'point_of_interest', 'establishment']
// url: "https://maps.google.com/?cid=6231193061390494320"
// user_ratings_total: 65
// utc_offset: (...)
// utc_offset_minutes: 480
// vicinity: "51 Old Airport Road, Lor 21A Geylang, #01-39"
