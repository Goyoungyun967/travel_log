import { atom, selector } from "recoil";
import dayjs from "dayjs";

const loginNoState = atom({
  key: "loginNoState",
  default: -1,
});

const memberLevelState = atom({
  key: "memberLevelState",
  default: -1,
});
const loginNicknameState = atom({
  key: "loginNicknameState",
  default: "",
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    const loginNo = state.get(loginNoState);
    const memberLevel = state.get(memberLevelState);
    const SellerNo = state.get(sellerLoginNoState);

    return (loginNo !== -1 || SellerNo !== -1) && memberLevel !== -1;
  },
});

//seller 부분 recoil
const sellerLoginNoState = atom({
  key: "sellerLoginNoState",
  default: -1,
});

const loginBusinessNameState = atom({
  key: " loginBusinessNameState",
  default: "",
});

const isSellerLoginState = selector({
  key: "isSellerLoginState",
  get: (state) => {
    const sellerLoginNo = state.get(sellerLoginNoState);
    return sellerLoginNo !== -1;
  },
});

//숙소 리코일
const lodgmentState = atom({
  key: "lodgmentState",
  default: "",
});

const guestState = atom({
  key: "guestState",
  default: 2,
});

const startDateState = atom({
  key: "startDateState",
  default: dayjs().add(1, "day").toDate(),
});

const endDateState = atom({
  key: "endDateState",
  default: dayjs().add(2, "day").toDate(),
});

export {
  loginNoState,
  memberLevelState,
  isLoginState,
  sellerLoginNoState,
  isSellerLoginState,
  loginNicknameState,
  loginBusinessNameState,
  lodgmentState,
  guestState,
  startDateState,
  endDateState,
};
