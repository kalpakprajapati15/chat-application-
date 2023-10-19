import { Component, OnDestroy, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../../models/post.model';
import { Observable, map, Subject } from 'rxjs';
import { takeUntil, switchMap, startWith, finalize, delay } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddFeedComponent } from './add-feed/add-feed.component';
import { ConfirmationService, MessageService, } from 'primeng/api';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnDestroy {
  posts: Observable<Post[]>;

  addPostRef: DynamicDialogRef | undefined;

  destroyed$: Subject<boolean> = new Subject();

  refresh$: Subject<boolean> = new Subject();

  loading: boolean = false;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  constructor(private messageService: MessageService, private postService: PostService, private dialogService: DialogService, private confirmationService: ConfirmationService) {
    this.posts = this.refresh$.pipe(startWith(true), switchMap(value => {
      this.loading = true;
      return this.postService.fetch().pipe(map((response) => {
        return response.result;
      }), finalize(() => this.loading = false));
    }))
  }

  addPost() {
    this.addPostRef = this.dialogService.open(AddFeedComponent, { data: "hello", header: "Add new post" });

    this.addPostRef.onClose.pipe(takeUntil(this.destroyed$.asObservable())).subscribe(shouldRefresh => {
      if (shouldRefresh) {
        this.refresh$.next(true);
      }
    })
  }

  delete(id: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this post?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.postService.delete(id).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Post', detail: 'Post deleted successfully' });
          this.refresh$.next(true);
        })
      },
      reject: () => {
        console.log('Delete rejected');

      }
    })
  }

  editPost(id: any) {
    this.postService.getById(id).subscribe(response => {
      const addPostRef = this.dialogService.open(AddFeedComponent, { data: response.result, header: response.result.title });

      addPostRef.onClose.pipe(takeUntil(this.destroyed$.asObservable())).subscribe(shouldRefresh => {
        if (shouldRefresh) {
          this.refresh$.next(true);
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
