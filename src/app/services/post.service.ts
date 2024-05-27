import { Post } from "../models/post.model";
import { ApiService } from "./api.service";
import { Injectable, Injector } from '@angular/core'

@Injectable()
export class PostService extends ApiService<Post> {

    url: string = 'post';

    instanceCounter: number = 0;

    constructor(private injector: Injector) {
        super(injector);
    }

    logCounter() {
        console.log(this.instanceCounter);
        this.instanceCounter++;
    }
}