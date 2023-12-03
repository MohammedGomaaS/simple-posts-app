import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryParamsHelperService } from './services';

const interceptors:any[] = [
]

const services = [QueryParamsHelperService]

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [...interceptors,...services]
})
export class CoreModule {
  constructor(){
  }
 }
