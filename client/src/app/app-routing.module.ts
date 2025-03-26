import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivateFn, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceProfileComponent } from './components/place-profile/place-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { HomeComponent } from './components/home/home.component';
import { UserRepository } from './state/user.repository';
import { map, take } from 'rxjs';
import { FollowedComponent } from './components/followed/followed.component';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';

export const checkIfAuthenticated = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userRepo = inject(UserRepository);
  const router = inject(Router);
  return userRepo.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      
      router.navigate(['']);
      return false;
    })
  );
}

export const hasSaved: CanDeactivateFn<NewPostComponent> = 
(createPost: NewPostComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(createPost.form.dirty && !createPost.isSubmitted){
    return confirm('You have not posted yet!\nAre you sure you want to leave?');
  }
  return true;
}

export const newUser: CanDeactivateFn<NewUserComponent> = 
(newUser: NewUserComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(newUser.form.dirty && !newUser.isSubmitted){
    return confirm('You have not created an account yet!\nAre you sure you want to leave?');
  }
  return true;
}

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: NewUserComponent, canDeactivate:[newUser]},
  {path: 'home', component: HomeComponent, canActivate: [checkIfAuthenticated]},
  {path: 'newpost', component: NewPostComponent, canActivate: [checkIfAuthenticated], canDeactivate:[hasSaved]},
  {path: 'viewpost/:postId', component: ViewPostComponent, canActivate: [checkIfAuthenticated]},
  {path: 'editpost/:postId', component: EditPostComponent, canActivate: [checkIfAuthenticated]},
  {path: 'viewplaces', component: PlaceListComponent, canActivate: [checkIfAuthenticated]},
  {path: 'place/:placeId', component: PlaceProfileComponent, canActivate: [checkIfAuthenticated]},
  {path: 'user/:userId', component: UserProfileComponent, canActivate: [checkIfAuthenticated]},
  {path: 'followed', component: FollowedComponent, canActivate: [checkIfAuthenticated]},
  {path: 'saved', component: SavedPostsComponent, canActivate: [checkIfAuthenticated]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
