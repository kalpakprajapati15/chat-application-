import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    constructor(private service: PostService) {
        this.service.logCounter();
    }
}
