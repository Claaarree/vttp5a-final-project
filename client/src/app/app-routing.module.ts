import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'createpost', component: NewPostComponent},
  {path: 'viewpost/:postId', component: ViewPostComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
