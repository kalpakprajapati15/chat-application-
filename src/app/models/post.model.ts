export interface Post {
    _id: string;
    title: string;
    content: string;
    createdBy: { name: string }
}