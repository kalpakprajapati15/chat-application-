import { Injectable, Injector } from '@angular/core';
import { Post } from '../models/post.model';
import { SocketService } from './base/socket.service';

@Injectable({ providedIn: 'root' })
export class PostSocketService extends SocketService {

    constructor(private injector: Injector) {
        super(injector);
    }

    getCreatePost() {
        return this.socket.fromEvent<Post>('Created Post')
    }

}