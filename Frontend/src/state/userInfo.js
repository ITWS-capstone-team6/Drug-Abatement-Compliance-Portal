import { atom } from 'jotai';

export const userInfoAtom = atom({
    userId: "123",
    awsUserId: '456',
    email: 'example@united.com',
    isAdmin: false,
})

export const userIdAtom= atom(userInfoAtom.userId);
export const userAwsUserIdAtom=atom(userInfoAtom.awsUserId);
export const userEmailAtom=atom(userInfoAtom.email);
export const userIsAdminAtom=atom(userInfoAtom.isAdmin);