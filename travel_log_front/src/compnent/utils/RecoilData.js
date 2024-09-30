import { atom, selector } from "recoil";

const loginNoState = atom({
  key: "loginNoState",
  default: -1,
});

const memberLevelState = atom({
  key: "memberLevelState",
  default: -1,
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    const loginNo = state.get(loginNoState);
    const memberLevel = state.get(memberLevelState);

    return loginNo !== -1 && memberLevel !== -1;
  },
});

export { loginNoState, memberLevelState, isLoginState };
