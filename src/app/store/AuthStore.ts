import { create } from "zustand";

type UserAuthStore = {
  id: number | null;
  username: string;
  token: string | null;

  saveInfo: (
    id: number,
    username: string,
    token: string
  ) => void;

  removeInfo: () => void;
};

const useAuthStore = create<UserAuthStore>((set) => ({
  id: null,
  username: "",
  token: null,

  saveInfo: (id, username, token) =>
    set({
      id,
      username,
      token,
    }),

  removeInfo: () =>
    set({
      id: null,
      username: "",
      token: null,
    }),
}));

export default useAuthStore;