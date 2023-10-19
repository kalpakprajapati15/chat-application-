import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main.component';
import { ResizeModule } from 'src/app/directives/resize/resize.module';
import { FeedModule } from './feed/feed.module';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ResizeModule,
    FeedModule
  ],
  bootstrap:[
    MainComponent
  ]
})
export class MainModule { }
