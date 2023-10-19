import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'
import { NgxLoadingModule } from 'ngx-loading'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { AddFeedComponent } from './add-feed/add-feed.component';
import { ResizeModule } from 'src/app/directives/resize/resize.module';
import { TooltipErrorModule } from 'src/app/directives/tooltip-error/resize.module';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  bootstrap:[
    FeedComponent
  ],
  declarations: [
    FeedComponent,
    AddFeedComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ResizeModule,
    ConfirmDialogModule,
    TooltipModule,
    TooltipErrorModule,
    NgxLoadingModule
  ],
  exports: [
    FeedComponent,
    AddFeedComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class FeedModule { }
