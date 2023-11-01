import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { TooltipModule } from 'primeng/tooltip';
import { ResizeModule } from 'src/app/directives/resize/resize.module';
import { TooltipErrorModule } from 'src/app/directives/tooltip-error/resize.module';
import { ChatMessageComponent } from './chat-message/chat-message.component';



@NgModule({
  declarations: [
    ChatComponent,
    AddContactComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    TooltipErrorModule,
    ResizeModule,
    NgxLoadingModule,
    ReactiveFormsModule,
    TabViewModule
  ]
})
export class ChatModule { }
