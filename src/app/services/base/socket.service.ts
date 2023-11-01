import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { Socket } from 'ngx-socket-io';
import { SetSocket } from '../../states/auth.state';

export class SocketService {

    socket: Socket;

    store: Store

    constructor(injector: Injector) {
        try {
            this.socket = injector.get(Socket);
        } catch (e) {
            console.error('error', e)
        }
        this.store = injector.get(Store);
        const socket = this.socket.connect();
        socket.on('connect', () => {
            this.store.dispatch(new SetSocket(socket.id));
        })
    }
}