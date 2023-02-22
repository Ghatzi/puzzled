import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import PageNotFound from './components/PageNotFound';
import { BASEURL } from './config/baseUrl';
import EditItem from './features/auth/EditItem';
import NewItem from './features/auth/NewItem';
import ItemsList from './features/ItemsList';
import ViewItem from './features/ViewItem';
import useFetch from './hooks/useFetch';

const App = () => {
  const username = 'jondoe123';
  const url = BASEURL;

  const { data: users } = useFetch(`${url}/users`);
  const {
    data: items,
    setData: setItems,
    isLoading: itemsLoading
  } = useFetch(`${url}/items`);

  return (
    <Routes>
      <Route path="/" element={<Layout username={username} />}>
        <Route index element={<Home />} />
        <Route path="items">
          <Route
            index
            element={<ItemsList items={items} itemsLoading={itemsLoading} />}
          />
        </Route>
        <Route path="item">
          <Route index element={<NewItem />} />
          <Route
            path=":id"
            element={
              <ViewItem
                items={items}
                setItems={setItems}
                users={users}
                username={username}
              />
            }
          />
        </Route>
        <Route path="edit">
          <Route
            path=":id"
            element={
              <EditItem items={items} users={users} username={username} />
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
