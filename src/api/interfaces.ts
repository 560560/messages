export interface ModelStatuses {
  SUCCESS: 200 | 201 | 0;
  ERROR: 100;
}

export type Status = ModelStatuses[keyof ModelStatuses];

export interface BaseResponse<T> {
  status: Status;
  response: T | undefined;
  message: string;
}

export interface Message {
  id: number;
  createdAt: string;
  userId: number;
  text: string;
}

export interface ComposedMessage extends Omit<Message, 'userId'> {
  user: User;
}

export interface MessageListData {
  items: Message[];
  totalCount: number;
}

export interface MessageList extends Omit<MessageListData, 'items'> {
  items: ComposedMessage[];
  totalCount: number;
}

export interface User {
  id: number;
  name: string;
  imgUrl: string;
}

export interface GetMessagesParams {
  query?: string;
  userId?: number;
  offset: number;
  limit: number;
}
