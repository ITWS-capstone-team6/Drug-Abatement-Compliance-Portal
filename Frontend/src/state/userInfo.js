import { atom } from 'jotai';

export const userInfoAtom = atom({
    userId: "123",
    awsUserId: '456',
    email: 'example@united.com',
    isAdmin: false,
})

export const userIdAtom = atom("");
export const userAwsUserIdAtom = atom("");
export const userEmailAtom = atom("");
export const userIsAdminAtom = atom(false);