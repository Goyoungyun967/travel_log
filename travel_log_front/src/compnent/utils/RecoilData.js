import { atom, selector } from "recoil";

const loginNoState = atom({
  key: "loginNoState",
  default: -1,
});

const memberLevelState = atom({
  key: "memberLevelState",
  default: -1,
});

const memberNicknameState = atom({
  key: "memberNicknameState",
  default: -1, // 기본값을 빈 문자열로 설정
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    const loginNo = state.get(loginNoState);
    const memberLevel = state.get(memberLevelState);
    const memberNickname = state.get(memberNicknameState);

    return loginNo !== -1 && memberLevel !== -1 && memberNickname !== -1;
  },
});

export { loginNoState, memberLevelState, isLoginState, memberNicknameState };
