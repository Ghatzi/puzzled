import { Route, Routes } from 'react-router-dom';
import { Home, Layout, PageNotFound } from './components';
import { BASEURL } from './config/baseUrl';
import { EditItem, EditUser, ItemsList, UsersList, ViewItem } from './features';
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

  const getUserById = users.find(user => user.username === username);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout getUserById={getUserById && getUserById.username} />}
      >
        <Route index element={<Home />} />
        <Route path="items">
          <Route
            index
            element={<ItemsList items={items} itemsLoading={itemsLoading} />}
          />
        </Route>
        <Route path="users">
          <Route
            index
            element={
              <UsersList
                users={users}
                setUsers={setUsers}
                usersLoading={usersLoading}
                getUserById={getUserById}
              />
            }
          />
        </Route>
        <Route path="item">
          <Route
            path=":id"
            element={
              <ViewItem
                items={items}
                setItems={setItems}
                getUserById={getUserById}
              />
            }
          />
          <Route
            path="edit/:id"
            element={<EditItem items={items} getUserById={getUserById} />}
          />
        </Route>
        <Route path="user">
          <Route
            path="edit/:id"
            element={
              <EditUser
                users={users}
                setUsers={setUsers}
                getUserById={getUserById}
              />
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
