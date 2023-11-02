import { User } from "./user.model";

export interface Message {
    text: string;
    fromId: User;
    toId: User;
    _id: string;
}

export interface UserMessageMap {
    [userId: string]: Message[],
}