import { Route, Routes } from 'react-router-dom';
import { Home, Layout, PageNotFound } from './components';
import { BASEURL } from './config/baseUrl';
import {
  EditItem,
  EditUser,
  ItemsList,
  NewItem,
  NewUser,
  UsersList,
  ViewItem
} from './features';
import useFetch from './hooks/useFetch';

const App = () => {
  const username = 'jondoe123';
  const url = BASEURL;

  const {
    data: users,
    setData: setUsers,
    isLoading: usersLoading
  } = useFetch(`${url}/users`);
  const {
    data: items,
    setData: setItems,
    isLoading: itemsLoading
  } = useFetch(`${url}/items`);

  const findUser = users.find(user => user.username === username);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout findUser={findUser && findUser.username} />}
      >
        <Route index element={<Home />} />
        <Route path="items">
          <Route
            index
            element={
              <ItemsList
                items={items}
                itemsLoading={itemsLoading}
                findUser={findUser}
              />
            }
          />
          <Route path="add" element={<NewItem />} />
        </Route>
        <Route path="users">
          <Route
            index
            element={
              <UsersList
                users={users}
                setUsers={setUsers}
                usersLoading={usersLoading}
                findUser={findUser}
              />
            }
          />
          <Route
            path="add"
            element={
              <NewUser
                usersCount={users.length ? users[users.length - 1].id + 1 : 1}
                findUser={findUser}
              />
            }
          />
        </Route>
        <Route path="item">
          <Route
            path=":id"
            element={
              <ViewItem items={items} setItems={setItems} findUser={findUser} />
            }
          />
          <Route
            path="edit/:id"
            element={<EditItem items={items} findUser={findUser} />}
          />
        </Route>
        <Route path="user">
          <Route
            path="edit/:id"
            element={
              <EditUser users={users} setUsers={setUsers} findUser={findUser} />
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
