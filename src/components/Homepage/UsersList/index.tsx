import React, {FC} from "react";
import {Link} from "react-router-dom";

import {UserItem} from "components/Homepage/UserItem";
import {IUsers} from "interfaces/apiInterfaces";

import S from './style.module.scss';

interface IProps {
  usersData: IUsers[];
}

export const UsersList: FC<IProps> = ({usersData}) => {
  return (
    <div className={S.UsersListWrapper}>
      <ul>
        {usersData && usersData.map((userItem )=>
          <Link
            to={`/profile/${userItem.id}`}
            key={userItem.id}
          >
          <UserItem
            avatar={userItem.avatar_url}
            userName={userItem.login}
          />
          </Link>
        )}
      </ul>
    </div>
  );
};
