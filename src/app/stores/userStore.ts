/* eslint-disable no-useless-catch */
import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  get isLoggedIn() {
    return !!this.user;
  }
  login = async (creds: UserFormValues) => {
    try {
      const result = await agent.Account.login(creds);
      store.commonStore.setToken(result.token);
      runInAction(() => (this.user = result));
      router.navigate("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const result = await agent.Account.register(creds);
      store.commonStore.setToken(result.token);
      runInAction(() => (this.user = result));
      router.navigate("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };
  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };

  setDisplayName = (name: string) => {
    if (this.user) {
      this.user.displayName = name;
    }
  };
}
