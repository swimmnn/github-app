import React, {
  FC,
  useCallback,
  useEffect,
  useState
} from "react";

import {API} from "api/api";
import {IRepos} from "interfaces/apiInterfaces";

import S from "./style.module.scss";


interface IProps {
  avatar: string;
  userName: string;
}

export const UserItem: FC<IProps> = ({
    avatar,
    userName
  }) => {

  const [repo, setRepo] = useState<IRepos[]>([]);

  const repoRequest = useCallback(async () => {
    let requestRes = await API.repos.getRepos(userName);
    setRepo(requestRes);
  }, []);

  useEffect(() => {
    (async () => repoRequest())();
  }, [repoRequest]);

  return (
    <div className={S.UserItemWrapper}>
      <div className={S.UserItemLeftContent}>
        <img
          className={S.UserItemImage}
          alt="userName"
          src={avatar}
        />
        <p className={S.UserItemTitle}>{userName}</p>
      </div>
      <span className={S.UserItemRepo}>Repo: {repo.length}</span>
    </div>
  );
};
