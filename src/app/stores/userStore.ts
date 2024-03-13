/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;
  fbLoading = false;
  refreshTokenTimeout: any;
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
      this.startRefreshTokenTimer(result);
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
      this.startRefreshTokenTimer(result);
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
      store.commonStore.setToken(user.token);
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

  facebookLogin = async (accessToken: string) => {
    try {
      this.fbLoading = true;
      const user = await agent.Account.fbLogin(accessToken);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.user = user;
        this.fbLoading = false;
      });
      router.navigate("/activities");
    } catch (error) {
      console.log(error);
      runInAction(() => (this.fbLoading = false));
    }
  };

  refreshToken = async () => {
    this.stopRefrestTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => {
        this.user = user;
      });
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };
  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }
  private stopRefrestTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
