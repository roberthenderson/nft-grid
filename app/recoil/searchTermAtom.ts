import { atom } from 'recoil';

export const searchTermAtom = atom<string>({
  key: 'searchTerm',
  default: '',
});
