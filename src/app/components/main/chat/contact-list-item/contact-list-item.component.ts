import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { ChatUIService } from '../services/chat-ui.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnInit, OnDestroy {

  @Input()
  user: User;

  getSocketMessageSubscription: Subscription;

  unreadMsgCount = signal<number>(0)

  constructor(public chatUIService: ChatUIService) {

  }

  ngOnInit(): void {
    if (this.user) {
      this.getSocketMessageSubscription = this.chatUIService.getSocketMessage(this.user).subscribe(message => {
        this.chatUIService.messageMap.mutate((messageMap) => {
          if (messageMap[this.user._id]) {
            messageMap[this.user._id].push(message);
          }
        });
        if (this.user._id !== this.chatUIService.currentUser()?._id) {
          this.unreadMsgCount.update(count => count + 1);
        }
      })
    }
  }

  contactItemCLick(user: User) {
    this.chatUIService.setCurrentUser(user);
    this.unreadMsgCount.set(0);
  }

  ngOnDestroy(): void {
    if (this.getSocketMessageSubscription) {
      this.getSocketMessageSubscription.unsubscribe();
    }
  }
}
