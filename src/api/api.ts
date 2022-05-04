import {
  IRepos,
  IUsers,
  IUser
} from "interfaces/apiInterfaces";

import {http} from "./api.init";

export const API = {
  users: {
    getAllUsers: async () =>
      http.get<IUsers[]>(`users`),
    getUserByName: async (userName: string) =>
      http.get<IUser>(`users/${userName}`)
  },
  repos: {
    getRepos: async (userName: string) =>
      http.get<IRepos[]>(`users/${userName}/repos`)
  }
};
