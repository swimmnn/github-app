import React, {
  FC,
  useCallback,
  useEffect,
  useState
} from "react";

import {API} from "api/api";
import {IUser} from "interfaces/apiInterfaces";
import {getDate} from "utils/dateConverter";

import S from "./style.module.scss";


interface IProps {
  userName: string;
}

export const ProfileTopBlock: FC<IProps> = ({userName}) => {

  const [currentUser, setCurrentUser] = useState<IUser>();

  const userRequest = useCallback(async () => {
    let requestRes = await API.users.getUserByName(userName);
    setCurrentUser(requestRes);
  }, [API, userName]);

  useEffect(() => {
    (async () => userRequest())();
  }, [userRequest]);

  return (
    <div className={S.ProfileTopBlockWrapper}>
      <div className={S.ProfileUserContent}>
        <img
          alt={currentUser?.name}
          src={currentUser?.avatar_url}
          className={S.ProfileAvatar}
        />
        <div className={S.ProfileUserData}>
          <p>{currentUser?.name}</p>
          <p>{currentUser?.email}</p>
          <p>{currentUser?.location}</p>
          <p>{getDate(currentUser?.created_at)}</p>
          <p>{currentUser?.followers}&nbsp;Followers</p>
          <p>Following&nbsp;{currentUser?.following}</p>
        </div>
      </div>
      <div className={S.ProfileUserBiography}>
        {currentUser?.bio != null ? currentUser?.bio : "No information about this guy"}
      </div>
    </div>
  );
};
