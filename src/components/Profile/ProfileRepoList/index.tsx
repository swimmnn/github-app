import React, {
  Dispatch,
  FC,
  useCallback,
  useEffect,
  useState
} from "react";

import {ProfileRepo} from "components/Profile/ProfileRepo";
import {SearchInput} from "components/SearchInput";
import {IRepos} from "interfaces/apiInterfaces";
import {API} from "api/api";

import S from "./style.module.scss";

interface IProps {
  userName: string;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
}

export const ProfileRepoList: FC<IProps> = ({
    userName,
    searchValue,
    setSearchValue
  }) => {

  const [repos, setRepos] = useState<IRepos[]>([]);

  const repoRequest = useCallback(async () => {
    let requestRes = await API.repos.getRepos(userName);
    setRepos(requestRes);
  }, []);

  const filteredRepos = repos.filter(filterItem => filterItem.name === searchValue);

  useEffect(() => {
    (async () => repoRequest())();
  }, [repoRequest]);

  return (
    <div className={S.ProfileRepoListWrapper}>
      <SearchInput
        placeholderName={"User`s Repositories"}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ul>
        {filteredRepos.length != 0 ? filteredRepos.map((repoItem, index) =>
          <a href={repoItem.svn_url}>
            <ProfileRepo
              key={index}
              repoName={repoItem.name}
              forksCount={repoItem.forks}
              starsCount={repoItem.stargazers_count}
            />
          </a>
        ) : repos.map((repoItem, index) =>
            <a href={repoItem.svn_url}>
              <ProfileRepo
                key={index}
                repoName={repoItem.name}
                forksCount={repoItem.forks}
                starsCount={repoItem.stargazers_count}
              />
            </a>
        )}
      </ul>
    </div>
  );
};
