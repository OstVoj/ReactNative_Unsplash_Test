import Unsplash from 'unsplash-js';

const ACCESS_KEY =
  'aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5';
const unsplash = new Unsplash({
  accessKey: ACCESS_KEY,
  timeout: 500
});

export const searchUsers = (searchText, page) => {
  return unsplash.search.users(searchText, page, 20);
};
