import { Component, OnDestroy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Socket } from 'ngx-socket-io'
import { PostSocketService } from './services/post-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'node_api';

  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }
}
