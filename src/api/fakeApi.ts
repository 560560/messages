import {
  BaseResponse,
  GetMessagesParams,
  Message,
  MessageListData,
  User,
} from "./interfaces";
import { sendFakeMessage, getFakeMessages, getFakeUser } from "./helpers";

export const MessageAPI = {
  getMessages(params: GetMessagesParams, fakeDelay: number) {
    return new Promise((resolve) => setTimeout(resolve, fakeDelay))
      .then(() => getFakeMessages(params))
      .then<BaseResponse<MessageListData>>((response) => response);
  },

  sendMessage(messageText: string, userId: number, fakeDelay: number) {
    return new Promise((resolve) => setTimeout(resolve, fakeDelay))
      .then(() => sendFakeMessage(messageText, userId))
      .then<BaseResponse<Message>>((response) => response);
  },
};

export const UsersAPI = {
  getUser(id: number, fakeDelay: number) {
    return new Promise((resolve) => setTimeout(resolve, fakeDelay))
      .then(() => getFakeUser(id))
      .then<BaseResponse<User>>((response) => response);
  },
};
