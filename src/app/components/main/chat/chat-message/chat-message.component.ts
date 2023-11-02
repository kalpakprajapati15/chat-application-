import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { User } from 'src/app/models/user.model';
import { ChatUIService } from '../services/chat-ui.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs'
import { Message } from 'src/app/models/message.model';

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
