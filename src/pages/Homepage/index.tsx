import React, {Dispatch, FC, useState} from "react";

import {SearchInput} from "components/SearchInput";
import {UsersList} from "components/Homepage/UsersList";
import {IUsers} from "interfaces/apiInterfaces";

import S from  "./style.module.scss";

interface IProps {
  usersData: IUsers[];
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
}

export const Homepage: FC<IProps> = ({
    usersData,
    searchValue,
    setSearchValue
  }) => {

  const filteredUsers = usersData.filter(filterItem => filterItem.login === searchValue);

  return (
    <div className={S.HomepageWrapper}>
      <SearchInput
        placeholderName={"Users"}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <UsersList usersData={filteredUsers.length != 0 ? filteredUsers : usersData}/>
    </div>
  );
};
