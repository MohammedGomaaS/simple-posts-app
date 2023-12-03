import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';

const routes: Routes = [{
  path: '',
  component: ApplicationComponent,
  children: [
    {
      path: '',
      redirectTo: 'posts',
      pathMatch: 'full'
    }, {
      path: 'posts',
      loadChildren: () => import('src/app/application/posts/posts.module').then(m => m.PostsModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
