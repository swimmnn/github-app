import React, {Dispatch, FC} from "react";
import {useParams} from "react-router-dom";

import {ProfileTopBlock} from "components/Profile/ProfileTopBlock";
import {ProfileRepoList} from "components/Profile/ProfileRepoList";
import {IUsers} from "interfaces/apiInterfaces";

import S from "./style.module.scss";

interface IProps {
  usersData: IUsers[];
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
}

export const Profile: FC<IProps> = ({
    usersData,
    searchValue,
    setSearchValue
}) => {
  const {id} = useParams();

  const user = usersData.find(user => user.id === Number(id));

  return (
    <div className={S.ProfileWrapper}>
      {user &&
        <>
          <ProfileTopBlock userName={user.login}/>
          <ProfileRepoList
            userName={user.login}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </>
      }
    </div>
  );
};
