import { atom } from 'recoil';

export const todoAtom = atom({
  key: 'todo',
  default: [],
});

export const progressAtom = atom({
  key: 'progress',
  default: [],
});

export const doneAtom = atom({
  key: 'done',
  default: [],
});
