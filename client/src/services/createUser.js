import { userCreateOptions } from "../data/requestParams";
export const createUser = (username, password, password2) => {
  fetch('/api/user',
    userCreateOptions('POST', { username, password, password2 })
  );
}