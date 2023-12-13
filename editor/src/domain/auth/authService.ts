import { firebaseAuthInit } from './firebase';

export const authInit = async () => {
  const response = await firebaseAuthInit();
  // console.log(response);
  // console.log("user", response.user);
  // console.log("uid", response.user.uid);
  return response.user.uid;
};
