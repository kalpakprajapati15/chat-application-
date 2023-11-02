import { Injectable, signal, computed, effect } from "@angular/core";
import { User } from "src/app/models/user.model";
import { ChatSocketService } from "./chat-socket.service";
import { ChatApiService } from "./chat-api.service";
import { ApiResponse } from "src/app/services/base/api.service";
import { Observable, take } from "rxjs";
import { Message, UserMessageMap } from "src/app/models/message.model";
import { Store } from "@ngxs/store";
import { AuthState } from "src/app/states/auth.state";

@Injectable()
export class ChatUIService {

    users = signal<User[]>([]);

    currentUser = signal<User>(null);

    messageMap = signal<UserMessageMap>({});

    currentUserMessages = computed<Message[]>(() => {
        const messageMap = this.messageMap();
        const currentUser = this.currentUser();
        if (messageMap && currentUser && messageMap[currentUser._id]) {
            return messageMap[currentUser._id];
        }
        return [];
    });

    constructor(public chatSocketService: ChatSocketService, public chatApiService: ChatApiService, public store: Store) {
    }

    setCurrentUser(user: User) {
        if (user._id !== this.currentUser()?._id) {
            this.currentUser.set(user);
            const messageMap = this.messageMap();
            // set messagemap of that user if not set already. 
            if (!messageMap[user._id]) {
                this.getMessages().pipe(take(1)).subscribe(response => {
                    this.messageMap.mutate((oMap) => {
                        oMap[user._id] = response.result;
                    })
                })
            }
        }
    }

    sendMessage(text: string) {
        const toUser = this.currentUser();
        const fromUser = this.store.selectSnapshot(AuthState.user)._id
        const message: Message = { text, toId: toUser._id, fromId: fromUser, _id: null }
        this.chatSocketService.sendMessage(message);
        this.messageMap.mutate((messageMap) => messageMap[toUser._id].push(message));
    }

    getSocketMessage(user: User) {
        return this.chatSocketService.getSocketMessage(user);
    }

    getMessages(): Observable<ApiResponse<Message[]>> {
        return this.chatApiService.get<Message[]>({ fromId: this.currentUser()._id });
    }

}