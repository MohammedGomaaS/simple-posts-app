import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from './services';
import { ContentComponent } from './components';
import {MatCardModule} from '@angular/material/card';
const components:any[] = [ContentComponent];
const directives:any[] = [];
const pipes:any[] = [];
const services = [PostsService];

@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [
    ...services
  ],
  exports: [ReactiveFormsModule,MatCardModule, ...components, ...directives, ...pipes]
})
export class SharedModule { }
