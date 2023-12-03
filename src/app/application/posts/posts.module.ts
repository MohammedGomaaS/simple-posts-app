import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import {MatInputModule} from '@angular/material/input';

const components:any[] = [];
const directives:any[] = [];
const pipes:any[] = [];
const services:any[] = [];
const pages = [AllPostsComponent,PostDetailsComponent];

@NgModule({
  declarations: [PostsComponent, ...components, ...directives, ...pipes, ...pages],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    MatInputModule
  ],
  providers: [...services]
})
export class PostsModule { }
