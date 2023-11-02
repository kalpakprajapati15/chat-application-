import { Injectable, Injector } from '@angular/core';
import { Message } from 'primeng/api';
import { ApiService } from 'src/app/services/base/api.service';

@Injectable({ providedIn: 'root' })
export class ChatApiService extends ApiService<Message> {
    url: string = 'message';

    constructor(private injector: Injector) {
        super(injector);
    }
}