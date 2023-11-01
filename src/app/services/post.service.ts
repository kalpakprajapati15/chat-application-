import { Post } from "../models/post.model";
import { ApiService } from "./base/api.service";
import { Injectable, Injector } from '@angular/core'

@Injectable({ providedIn: "root" })
export class PostService extends ApiService<Post> {

    url: string = 'post';

    constructor(private injector: Injector) {
        super(injector);
    }
}