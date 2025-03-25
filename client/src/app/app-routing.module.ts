import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceProfileComponent } from './components/place-profile/place-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: NewUserComponent},
  {path: 'home', component: HomeComponent},
  {path: 'newpost', component: NewPostComponent},
  {path: 'viewpost/:postId', component: ViewPostComponent},
  {path: 'editpost/:postId', component: EditPostComponent},
  {path: 'viewplaces', component: PlaceListComponent},
  {path: 'place/:placeId', component: PlaceProfileComponent},
  {path: 'user/:userId', component: UserProfileComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
