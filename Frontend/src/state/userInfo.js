import { atom } from 'jotai';

export const userInfoAtom = atom({
    id: 123,
    name: 'First Last',
    email: 'example@united.com',
})

export const userIdStateAtom= atom(userInfoAtom.id);
export const userNameStateAtom= atom(userInfoAtom.name);
export const userEmailStateAtom=atom(userInfoAtom.email);