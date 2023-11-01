import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, OnDestroy } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ConfirmationService, MessageService, } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, map } from 'rxjs';
import { finalize, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { PostSocketService } from 'src/app/services/post-socket.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../../models/post.model';
import { AddFeedComponent } from './add-feed/add-feed.component';

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

  constructor(private messageService: MessageService, private postService: PostService, private dialogService: DialogService, private confirmationService: ConfirmationService, private postSocketService: PostSocketService) {
    this.posts = this.refresh$.pipe(startWith(true), switchMap(value => {
      this.loading = true;
      return this.postService.fetch().pipe(map((response) => {
        return response.result;
      }), finalize(() => this.loading = false));
    }))

    this.postSocketService.getCreatePost().pipe(takeUntilDestroyed()).subscribe((response) => {
      this.refresh$.next(true);
    })
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
    this.loading = true;
    this.postService.getById(id).pipe(finalize(() => this.loading = false)).subscribe(response => {
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
