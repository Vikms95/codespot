import { userCreateOptions } from "../data/requestParams";
export const loginUser = async (username, password) => {
  const response = await fetch('/api/session',
    userCreateOptions('POST', { username, password })
  );
  const data = await response.json();
  return data
}