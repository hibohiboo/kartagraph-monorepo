import { authInit } from '@kartagraph-editor/domain/auth/authService';
import { atom } from 'jotai';
// https://jotai.org/docs/core/atom#advanced-api
const userIdAtom = atom<string | null>(null);
export const initUserIdAtom = atom(null, async (get, set) => {
  const userId = await authInit();
  set(userIdAtom, userId);
});
export const getUserIdAtom = atom((get) => {
  const userId = get(userIdAtom);

  return userId;
});
