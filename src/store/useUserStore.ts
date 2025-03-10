import { create } from "zustand";
import { UserType } from "@/types/entities/UserTypes";
import { persist } from "zustand/middleware";

export type IUseUsers = {
  currentUser: UserType | null;
  setCurrentUser: (currentUser: UserType | null) => void;
};

export const UseUserStore = create<IUseUsers>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (currentUser: UserType | null) =>
        set(() => ({ currentUser })),
    }),
    { name: "UserData" }
  )
);
