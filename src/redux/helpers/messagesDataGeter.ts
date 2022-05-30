import { compact, uniq } from "lodash";

import { MessageAPI, UsersAPI } from "../../api/fakeApi";
import { User } from "../../api/interfaces";

interface MessagesDataGetterParams {
  limit: number;
  offset: number;
  query?: string;
  userId?: number;
  fakeDelay: number;
}

interface Items<I> {
  [id: number]: I;
}

interface BaseItem {
  id: number;
}

function reduceCb<K extends Items<I>, I extends BaseItem>(acc: K, item: I): K {
  acc[item.id] = item;
  return acc;
}

export const messagesDataGetter = async ({
  limit,
  offset,
  query,
  userId,
  fakeDelay,
}: MessagesDataGetterParams) => {
  const messages = await MessageAPI.getMessages(
    {
      limit,
      offset,
      query,
      userId,
    },
    fakeDelay
  );

  const usersIds: number[] = uniq(
    messages.response!.items.map((message) => message.userId)
  );

  const users = await Promise.all(
    usersIds.map((id) => UsersAPI.getUser(id, 10).then((user) => user.response))
  );

  const usersMap = compact(users).reduce<Items<User>>(reduceCb, {});

  const composedItems = messages.response!.items.map((message) => {
    return {
      id: message.id,
      createdAt: message.createdAt,
      user: {
        id: message.userId,
        name: usersMap[message.userId].name,
        imgUrl: usersMap[message.userId].imgUrl,
      },
      text: message.text,
    };
  });

  return {
    ...messages,
    response: { ...messages.response, items: composedItems },
  };
};
