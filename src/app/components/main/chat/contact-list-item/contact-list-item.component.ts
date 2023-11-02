import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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

  constructor(public chatUIService: ChatUIService) {

  }

  ngOnInit(): void {
    if (this.user) {
      this.getSocketMessageSubscription = this.chatUIService.getSocketMessage(this.user).subscribe(message => {
        this.chatUIService.messageMap.mutate((messageMap) => {
          if (messageMap[this.user._id]) {
            messageMap[this.user._id].push(message);
          }
        })
      })
    }
  }

  contactItemCLick(user: User) {
    this.chatUIService.setCurrentUser(user);
  }

  ngOnDestroy(): void {
    if(this.getSocketMessageSubscription){
      this.getSocketMessageSubscription.unsubscribe();
    }
  }
}
