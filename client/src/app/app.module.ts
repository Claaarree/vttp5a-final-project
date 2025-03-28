import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPostComponent } from './components/new-post/new-post.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { PrimeNGModule } from './primeNG/prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { MessageService } from 'primeng/api';
import { MyPreset } from './primeNG/mytheme';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PlaceProfileComponent } from './components/place-profile/place-profile.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PostSummaryComponent } from './components/post-summary/post-summary.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { HomeComponent } from './components/home/home.component';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';
import { FollowedComponent } from './components/followed/followed.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    NewPostComponent,
    AutocompleteComponent,
    ViewPostComponent,
    EditPostComponent,
    PlaceProfileComponent,
    PlaceListComponent,
    PostSummaryComponent,
    UserProfileComponent,
    NewUserComponent,
    HomeComponent,
    SavedPostsComponent,
    FollowedComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: MyPreset
        },
        ripple:true 
    }),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

