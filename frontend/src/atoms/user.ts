import { atom } from "recoil";

const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem("userToken")
    ? JSON.parse(localStorage.getItem("userToken") as string)
    : null,
});

const userState = atom({
  key: "userState",
  default: null,
});

export { tokenState, userState };
