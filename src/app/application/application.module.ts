import { ApplicationRoutingModule } from './application-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';

@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ],
  exports: []
})
export class ApplicationModule { }
