import React, {FC} from "react";

import S from "./style.module.scss";

interface IProps {
  repoName: string;
  forksCount: number;
  starsCount: number;
}

export const ProfileRepo: FC<IProps> = ({
    repoName,
    forksCount,
    starsCount
  }) => {

  return (
    <div className={S.ProfileRepoWrapper}>
      <p className={S.ProfileRepoTitle}>{repoName}</p>
      <div className={S.RepoInfo}>
        <div>{forksCount} Forks</div>
        <div>{starsCount} Stars</div>
      </div>
    </div>
  );
};
