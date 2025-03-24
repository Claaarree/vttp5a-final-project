import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PlaceListComponent } from './components/place-list/place-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'newpost', component: NewPostComponent},
  {path: 'viewpost/:postId', component: ViewPostComponent},
  {path: 'editpost/:postId', component: EditPostComponent},
  {path: 'viewplaces', component: PlaceListComponent},
  // TODO change this
  {path: 'place/:placeId', component: NewPostComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
