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
import { ChatUIService } from './services/chat-ui.service';
import { ChatSocketService } from './services/chat-socket.service';
import { ContactListItemComponent } from './contact-list-item/contact-list-item.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    ChatComponent,
    AddContactComponent,
    ChatMessageComponent,
    ContactListItemComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    TooltipModule,
    TooltipErrorModule,
    ResizeModule,
    NgxLoadingModule,
    ReactiveFormsModule,
    TabViewModule
  ],
  providers: [ChatUIService, ChatSocketService, ConfirmationService]
})
export class ChatModule { }
