import React, {
  useCallback,
  useEffect,
  useState
} from "react";
import {
  Route,
  Routes
} from "react-router-dom";

import {ROUTES} from "routingConstants";
import {Homepage} from "pages/Homepage";
import {Profile} from "pages/Profile";
import {IUsers} from "interfaces/apiInterfaces";
import {API} from "api/api";

export const AppRoutes = () => {

  const [usersData, setUsersData] = useState<IUsers[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');

  const requestUsers = useCallback( async () => {
    let requestRes = await API.users.getAllUsers();
    setUsersData(requestRes);
  }, [API]);

  useEffect(() => {
    (async () => requestUsers())()
  }, [requestUsers]);

  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={<Homepage
          usersData={usersData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />}
      />
      <Route
        path={ROUTES.profilePage}
        element={<Profile
          usersData={usersData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />}
      />
    </Routes>
  );
};
