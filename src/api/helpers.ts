import dayjs from 'dayjs';

import { DateTemplates } from '../common/helpers/dateTemplates';
import {
  BaseResponse,
  GetMessagesParams,
  Message,
  MessageListData,
  Status,
  User,
} from './interfaces';

export const messages: Message[] = [
  {
    id: 41,
    userId: 1,
    createdAt: '2022-05-29 23:59:59',
    text: 'Не может быть гейш некрасивых.\n' + 'Скорее – саке не хватает.\n' + 'Японская мудрость',
  },
  {
    id: 40,
    userId: 1,
    createdAt: '2022-05-29 21:10:02',
    text:
      'Вновь подойду я к окошку,\n' +
      'Пригляжу - а на месте ли звезды?\n' +
      'И машина моя во дворе...\n',
  },
  {
    id: 39,
    userId: 2,
    createdAt: '2022-05-29 21:09:00',
    text: 'Проснувшись утром,\n' + 'Не забудь глаза открыть -\n' + 'А то шишку набьешь',
  },

  {
    id: 38,
    userId: 1,
    createdAt: '2022-05-29 20:44:42',
    text: 'Плачет мальчик -\n' + 'Растерял под осенним дождем\n' + 'Своих покемонов.',
  },

  {
    id: 37,
    userId: 3,
    createdAt: '2022-05-29 20:03:00',
    text: 'Спрячь же свой меч самурай.\n' + 'Выпей бутылку саке.\n' + 'Пятница ведь наступила.\n',
  },

  {
    id: 36,
    userId: 1,
    createdAt: '2022-05-29 17:19:49',
    text:
      'Строг этикет самурая:\n' +
      'Кто ругательным словом обзывается -\n' +
      'Тот сам называется так.\n',
  },

  {
    id: 35,
    userId: 3,
    createdAt: '2022-05-29 11:07:12',
    text:
      'Подобен лучу самурайский клинок,\n' +
      'Но и он затупился -\n' +
      'Проклятая "Килька в томате"!',
  },

  {
    id: 34,
    userId: 1,
    createdAt: '2022-05-28 22:01:01',
    text:
      'Жили у старой женщины\n' +
      'Две рыбы фугу.\n' +
      'Одна белая, другая серая - две веселых рыбы.',
  },

  {
    id: 33,
    userId: 2,
    createdAt: '2022-05-28 18:10:29',
    text: 'Подъезд ночной, подоконник.\n' + 'Закончились суши в томате.\n' + 'Саке остывает.\n',
  },

  {
    id: 32,
    userId: 3,
    createdAt: '2022-05-28 12:42:59',
    text:
      'Чичичи, ловкая древесная обезьяна,\n' +
      'Помогает продавцу кирпичей, дергает веревку.\n' +
      'Дивные звуки.',
  },

  {
    id: 31,
    userId: 2,
    createdAt: '2022-05-28 11:12:59',
    text: 'Карпов крупою кормя,\n' + 'Школьных друзей вспоминал –\n' + 'Те же хвосты.',
  },

  {
    id: 30,
    userId: 2,
    createdAt: '2022-05-28 10:33:21',
    text: 'Грохнулось все.\n' + 'Я - синий Экран Смерти.\n' + 'Твой вопль напрасен.',
  },

  {
    id: 29,
    userId: 1,
    createdAt: '2022-05-28 10:31:11',
    text:
      'Ах, солярку не жги,\n' + 'Быстроногий автобус-сан,\n' + 'Не угнаться тебе за трамваем...',
  },

  {
    id: 28,
    userId: 3,
    createdAt: '2022-05-28 10:30:33',
    text:
      'Потеряла лицо Таня-тян -\n' +
      'Плачет о мяче, укатившемся в пруд.\n' +
      'Возьми себя в руки, дочь самурая.\n',
  },

  {
    id: 27,
    userId: 1,
    createdAt: '2022-05-28 10:30:22',
    text: 'Подверглась насилью вчера\n' + 'Я возле сада камней\n' + 'Снова сегодня пойду.',
  },

  {
    id: 26,
    userId: 2,
    createdAt: '2022-05-27 22:03:32',
    text:
      'Да, нелегка самурайская жизнь\n' + 'Но делать себе харакири\n' + 'Обидно, поевши пельменей…',
  },

  {
    id: 25,
    userId: 1,
    createdAt: '2022-05-27 21:07:59',
    text:
      'Мое кимоно истрепалось и\n' + 'Тело сквозь дыры вылазит -\n' + 'Эротикой здесь и не пахнет…',
  },

  {
    id: 24,
    userId: 3,
    createdAt: '2022-05-27 17:04:38',
    text:
      'Собрались простолюдины ? кому водить?\n' +
      'С громкой речью шагает вперед\n' +
      'Шишел-мышел-сан.',
  },

  {
    id: 23,
    userId: 2,
    createdAt: '2022-05-26 21:07:08',
    text: 'Бережно грабли кладу\n' + 'Перед дверью соседа.\n' + 'Ошибкам учиться хочу.',
  },

  {
    id: 22,
    userId: 2,
    createdAt: '2022-05-26 11:59:43',
    text:
      'По отдельности каждый из вас –\n' +
      'Ломкий и хрупкий прутик.\n' +
      'И лишь вместе вам быть метлою поганой.\n',
  },

  {
    id: 21,
    userId: 1,
    createdAt: '2022-05-26 10:42:33',
    text: 'Если вернувшись из бани\n' + 'Муж в душ первым делом идёт,\n' + 'Значит что то нечисто.',
  },

  {
    id: 20,
    userId: 3,
    createdAt: '2022-05-26 08:52:19',
    text:
      'Не ходите, девушки, замуж за Иванаки Кудзио.\n' +
      'У Иванаки Кудзио то, что нужно,\n' +
      'Втрое больше, чем можно.\n',
  },

  {
    id: 19,
    userId: 1,
    createdAt: '2022-05-26 03:21:56',
    text:
      'Пляшут на одной ножке довольные торговцы рисом -\n' +
      'Обманули неумного человека\n' +
      'На четыре кулака.',
  },

  {
    id: 18,
    userId: 3,
    createdAt: '2022-05-25 23:32:11',
    text: 'Соевым соусом морду намажу,\n' + 'Сяду в кусты у дороги -\n' + 'Чем я не ниндзя?',
  },

  {
    id: 17,
    userId: 1,
    createdAt: '2022-05-24 06:48:52',
    text: 'Маленький мальчик на сакуру полез\n' + 'Хрустнула ветка\n' + 'Наелся, блин...',
  },

  {
    id: 16,
    userId: 2,
    createdAt: '2022-05-24 06:44:59',
    text:
      'Вот в новостях опять какой-то съезд,\n' +
      'Премьера речь я до конца прослушал.\n' +
      'Пойду, стряхну лапшу с ушей…',
  },

  {
    id: 15,
    userId: 3,
    createdAt: '2022-05-24 06:20:17',
    text: 'Ответ подрагивает твой\n' + 'Цветами на ушах моих...\n' + 'Печальна икебана.',
  },

  {
    id: 14,
    userId: 2,
    createdAt: '2022-05-24 04:42:01',
    text:
      'Третью ночь в телескоп наблюдаю\n' +
      'Соседку, что в доме напротив.\n' +
      'Как ей не стыдно?!',
  },

  {
    id: 13,
    userId: 1,
    createdAt: '2022-05-23 21:21:21',
    text: 'Без денег\n' + 'Что проку\n' + 'От хокку?',
  },

  {
    id: 12,
    userId: 3,
    createdAt: '2022-05-23 20:17:01',
    text:
      'Часто в весеннем лесу\n' +
      'Пил Рихард Зорге бамбуковый сок\n' +
      'И матом по-русски ругался…',
  },

  {
    id: 11,
    userId: 1,
    createdAt: '2022-05-23 19:51:36',
    text: 'С милой рай в шалаше.\n' + 'Чтобы волю свою закалить -\n' + 'Тёщу туда же!',
  },
  {
    id: 10,
    userId: 3,
    createdAt: '2022-05-20 18:01:00',
    text:
      'Меньше и меньше кругом самураев\n' + 'Вот и соседи недавно\n' + 'Тоже свалили в Израиль…',
  },
  {
    id: 9,
    userId: 2,
    createdAt: '2022-05-20 17:30:53',
    text:
      'Что же ты, гейша, лежишь нагишом?\n' +
      'Знаю, что жарко, но я же терплю\n' +
      'Видишь, тулуп не снимаю!',
  },
  {
    id: 8,
    userId: 1,
    createdAt: '2022-05-20 17:29:02',
    text:
      'Всем хороши самурайские жены:\n' +
      'Прекрасны, как Аматэраcу\n' +
      'Жарят и парят, но скалкой дерутся изрядно…',
  },
  {
    id: 7,
    userId: 2,
    createdAt: '2022-05-20 13:20:40',
    text:
      'Редки сугробы в предместьях Киото\n' +
      'Но всё же не так, как саке из картошки\n' +
      'Мордой в сугробе лежу…\n',
  },
  {
    id: 6,
    userId: 3,
    createdAt: '2022-05-17 12:29:49',
    text: 'Ставлю под стол оливье.\n' + 'Продолжается праздник.\n' + 'Друг мой еще не заснул.',
  },
  {
    id: 5,
    userId: 3,
    createdAt: '2022-05-17 10:14:51',
    text: 'Желать мы будем все и вместе\n' + 'Успехов дружных..\n' + 'Штоб насладиться',
  },
  {
    id: 4,
    userId: 2,
    createdAt: '2022-05-12 06:07:08',
    text:
      'Когда все слова, пожелания которые\n' +
      'Мог подобать, уже подобрали другие...\n' +
      'И где я ходил?',
  },
  {
    id: 3,
    userId: 2,
    createdAt: '2022-05-12 02:07:45',
    text: 'Жаль очень мне\n' + 'Один раз в год\n' + 'Жена разрешает саке',
  },
  {
    id: 2,
    userId: 4,
    createdAt: '2022-05-11 11:11:11',
    text: 'Неизящны простолюдины\n' + 'Под весенним дождем,\n' + 'Играю на сямисэне.',
  },
  {
    id: 1,
    userId: 1,
    createdAt: '2022-05-11 11:01:11',
    text: 'Вот и мок закончился.\n' + 'Работает пагинация,\n' + 'Радостно.',
  },
];

export const users: User[] = [
  {
    id: 1,
    name: 'Admin',
    imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 2,
    name: 'Samael',
    imgUrl: 'https://randomuser.me/api/portraits/men/72.jpg',
  },
  {
    id: 3,
    name: 'Cara',
    imgUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 4,
    name: 'Sinth',
    imgUrl: '',
  },
];

const checkQuery = (text: string, query: string) => {
  const indexOfQuery = text.toLowerCase().indexOf(query.toLowerCase());
  return indexOfQuery >= 0;
};

const checkUserId = (messageUserId: number, userId: number) => {
  return messageUserId === userId;
};

export const getFakeMessages = (params: GetMessagesParams): BaseResponse<MessageListData> => {
  const { query, userId, offset, limit } = params;

  const filteredMessages = messages.filter((message) => {
    let isQueryMatch = query ? checkQuery(message.text, query) : true;
    let isUserIdMatch = userId ? checkUserId(message.userId, userId) : true;

    return isQueryMatch && isUserIdMatch;
  });

  const responseMessage = filteredMessages.length ? '' : 'Messages not found';

  const paginatedMessages = filteredMessages.slice(offset, offset + limit);

  return {
    status: 200 as Status,
    response: { items: paginatedMessages, totalCount: filteredMessages.length },
    message: responseMessage,
  };
};

export const sendFakeMessage = (message: string, userId: number) => {
  const newMessage: Message = {
    id: messages[0].id + 1,
    text: message,
    userId,
    createdAt: dayjs().format(DateTemplates.FORMAT_ISO_WITH_TIME),
  };

  messages.unshift(newMessage);
  return { status: 200 as Status, response: newMessage, message: '' };
};

export const getFakeUser = (id: number): BaseResponse<User> => {
  const user = users.find((user) => user.id === id);
  const responseMessage = user ? '' : 'User not found';

  return { status: 200 as Status, response: user, message: responseMessage };
};
