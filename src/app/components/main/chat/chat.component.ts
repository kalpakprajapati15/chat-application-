import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { finalize, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ChatUIService } from './services/chat-ui.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnDestroy {

  users$: Observable<User[]>;

  addContactRef: DynamicDialogRef | undefined;

  refresh$: Subject<boolean> = new Subject();

  loading: boolean = false;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  destroyed$: Subject<boolean> = new Subject();

  constructor(private userService: UserService, private dialogService: DialogService, public chatUIService: ChatUIService, private confirmationService: ConfirmationService) {
    this.users$ = this.refresh$.pipe(startWith(true), switchMap(() => {
      this.loading = true;
      return this.userService.get<{ contacts: User[] }>(null, null, null, '/getContacts').pipe(map(res => {
        this.chatUIService.users.set(res.result.contacts);
        return res.result.contacts;
      }), finalize(() => this.loading = false));
    }));

    this.chatUIService.getContactAdded().pipe(takeUntil(this.destroyed$)).subscribe((val) => {
      if (val) {
        this.confirmationService.confirm({
          message: 'A new contact has added you. Do you want to refresh now?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => { this.refresh$.next(true) }
        }
        )
      }
    });

  }

  addContact() {
    this.addContactRef = this.dialogService.open(AddContactComponent, { header: "Add new Contact" });

    this.addContactRef.onClose.pipe(takeUntil(this.destroyed$)).subscribe((shouldRefresh) => {
      if (shouldRefresh) {
        this.refresh$.next(true)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
