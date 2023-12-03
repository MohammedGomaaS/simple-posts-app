import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';

import { PostsComponent } from './posts.component';

const routes: Routes = [
  {
    path: '', component: PostsComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-posts',
        pathMatch: 'full'
      },
      {
        path: 'all-posts', component: AllPostsComponent
      },
      {
        path: ':postId/details', component: PostDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
