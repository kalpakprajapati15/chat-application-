import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { focusInvalidControl } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  data: any = null;

  baseForm: FormGroup;

  loading: boolean = false;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  constructor(public elementRef: ElementRef, private store: Store, public dialogRef: DynamicDialogRef, private fb: FormBuilder, private userService: UserService, private messageService: MessageService) {
    this.baseForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.baseForm.valid) {
      const formValue = this.baseForm.value;
      this.loading = true;
      this.userService.post(formValue, null, null, null, '/addContact').pipe(take(1), finalize(() => this.loading = false)).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Post', detail: 'Contact added successfully' });
        this.dialogRef.close(true);
      })
    } else {
      focusInvalidControl(this.elementRef)
    }
  }
}
