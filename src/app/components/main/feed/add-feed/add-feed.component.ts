import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../../../models/post.model';
import { take, finalize } from 'rxjs/operators'
import { MessageService } from 'primeng/api';
import { focusInvalidControl } from 'src/app/utils/utils';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.scss']
})
export class AddFeedComponent implements OnInit {

  data: any = null;

  baseForm: FormGroup;

  loading: boolean = false;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  constructor(public elementRef: ElementRef, public dialogRef: DynamicDialogRef, private fb: FormBuilder, private postService: PostService, private messageService: MessageService, private dialogConfig: DynamicDialogConfig) {
    this.baseForm = this.fb.group({
      _id: [null],
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
    if (this.dialogConfig.data) {
      this.baseForm.reset(this.dialogConfig.data)
    }
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
      formValue.createdBy = localStorage.getItem('email');
      this.loading = true;
      this.postService.post(formValue).pipe(take(1), finalize(() => this.loading = false)).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Post', detail: formValue._id ? 'Post updated successfully' : 'Post added successfully' });
        this.dialogRef.close(true);
      })
    } else {
      focusInvalidControl(this.elementRef)
    }
  }

}
