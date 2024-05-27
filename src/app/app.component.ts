import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [PostService]
})
export class AppComponent {
  title = 'node_api';
  constructor(private primengConfig: PrimeNGConfig, private service: PostService) {
    this.primengConfig.ripple = true;
    this.service.logCounter();
  }
}
