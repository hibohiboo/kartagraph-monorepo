import { firebaseAuthInit } from './firebase';

export const authInit = async () => {
  const response = await firebaseAuthInit();
  return response.user.uid;
};
