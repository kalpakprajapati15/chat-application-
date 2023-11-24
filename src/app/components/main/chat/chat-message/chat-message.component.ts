import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { ChatUIService } from '../services/chat-ui.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  user: User = null;

  messages$: Observable<Message[]>;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  constructor(public chatUIService: ChatUIService) {
    this.messages$ = toObservable(this.chatUIService.currentUserMessages);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  chatText: FormControl = new FormControl()

  ngOnInit(): void {

  }

  keyDownHandler(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        this.chatUIService.sendMessage(this.chatText.value);
        this.chatText.setValue('');
    }
  }

  ngOnDestroy(): void {

  }
}
