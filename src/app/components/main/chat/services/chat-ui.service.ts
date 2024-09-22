import { Injectable, computed, signal } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, Subject, finalize, take } from "rxjs";
import { Message, UserMessageMap } from "src/app/models/message.model";
import { User } from "src/app/models/user.model";
import { ApiResponse } from "src/app/services/base/api.service";
import { AuthState } from "src/app/states/auth.state";
import { ChatApiService } from "./chat-api.service";
import { ChatSocketService } from "./chat-socket.service";

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

    chatLoading$: Subject<boolean> = new Subject();

    constructor(public chatSocketService: ChatSocketService, public chatApiService: ChatApiService, public store: Store) {
    }

    setCurrentUser(user: User) {
        if (user._id !== this.currentUser()?._id) {
            this.currentUser.set(user);
            const messageMap = this.messageMap();
            // set messagemap of that user if not set already. 
            if (!messageMap[user._id]) {
                this.chatLoading$.next(true);
                this.getMessages().pipe(take(1), finalize(() => this.chatLoading$.next(false))).subscribe(response => {
                    this.messageMap.update((oMap) => {
                        oMap[user._id] = response.result;
                        return oMap;
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
        this.messageMap.update((messageMap) => {messageMap[toUser._id].push(message); return messageMap});
    }

    getSocketMessage(user: User) {
        return this.chatSocketService.getSocketMessage(user);
    }

    getSocketMessageUpdateId() {
        return this.chatSocketService.getSocketMessageUpdateId(this.currentUser());
    }

    getMessages(): Observable<ApiResponse<Message[]>> {
        return this.chatApiService.get<Message[]>({ fromId: this.currentUser()._id });
    }

    getContactAdded() {
        return this.chatSocketService.getContactAdded();
    }

}