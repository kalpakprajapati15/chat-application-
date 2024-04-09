import { Injectable, Injector } from "@angular/core";
import { filter } from 'rxjs/operators';
import { Message } from "src/app/models/message.model";
import { User } from "src/app/models/user.model";
import { SocketService } from "src/app/services/base/socket.service";

@Injectable()
export class ChatSocketService extends SocketService {

    constructor(private injector: Injector) {
        super(injector);
    }

    sendMessage(message: Message) {
        this.socket.emit('Client Message', message);
    }

    getSocketMessage(fromUser: User) {
        return this.socket.fromEvent<Message>('Client Get Message').pipe(filter((value) => {
            return value.fromId === fromUser._id;
        }));
    }

    getSocketMessageUpdateId(currentUser: User) {
        return this.socket.fromEvent<Message>('Client Update Message Id').pipe(filter((value) => {
            return value.fromId === currentUser._id;
        }));
    }

    getContactAdded() {
        return this.socket.fromEvent('Contact Added');
    }

}