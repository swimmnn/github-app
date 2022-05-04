import React, {
  Dispatch,
  FC,
  useState
} from "react";

import S from "./style.module.scss";

interface IProps {
  placeholderName: string;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
}

export const SearchInput: FC<IProps> = ({
    placeholderName,
    searchValue,
    setSearchValue
  }) => {

  const onChangeInputValue = (event: any) => setSearchValue(event.target.value);

  return (
    <input
      className={S.SearchInput}
      placeholder={`Search for ${placeholderName}`}
      value={searchValue}
      onChange={onChangeInputValue}
    />
  );
};
