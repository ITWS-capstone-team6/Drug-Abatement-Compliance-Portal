import { atom } from 'jotai';
const view = {
  LOGIN: true,
  SIGNUP: false,
};
export const loggedInAtom = atom(false);
export const loginStateAtom = atom(view.LOGIN);

