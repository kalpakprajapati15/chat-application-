import { Component, signal, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, finalize, takeUntil } from 'rxjs/operators'
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnDestroy {

  users$: Observable<User[]>;

  addContactRef: DynamicDialogRef | undefined;

  refresh$: Subject<boolean> = new Subject();

  currentUser = signal<User>(null);

  loading: boolean = false;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  destroyed$: Subject<boolean> = new Subject();

  constructor(private userService: UserService, private dialogService: DialogService) {
    this.users$ = this.refresh$.pipe(startWith(true), switchMap(() => {
      this.loading = true;
      return this.userService.get<{ contacts: User[] }>({ userId: '12' }, null, null, '/getContacts').pipe(map(res => {
        return res.result.contacts;
      }), finalize(() => this.loading = false));
    }))
  }

  addContact() {
    this.addContactRef = this.dialogService.open(AddContactComponent, { header: "Add new post" });

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
