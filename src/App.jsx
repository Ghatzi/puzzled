import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import PageNotFound from './components/PageNotFound';
import { BASEURL } from './config/baseUrl';
import EditItem from './features/auth/EditItem';
import NewItem from './features/auth/NewItem';
import ItemsList from './features/ItemsList';
import ViewItem from './features/ViewItem';

const App = () => {
  const [items, setItems] = useState([]);

  const role = 'user';

  const url = `${BASEURL}/items`;

  useEffect(() => {
    let isMounted = true;

    const fetchItem = async () => {
      try {
        const response = await fetch(url);
        if (isMounted) {
          const data = await response.json();
          setItems(data);
        }
      } catch (err) {
        console.log(`Error ${err.message}`);
      }
    };

    fetchItem();

    const cleanUp = () => (isMounted = false);

    return cleanUp;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="items">
          <Route index element={<ItemsList items={items} />} />
        </Route>

        <Route path="item">
          <Route index element={<NewItem />} />
          <Route
            path=":id"
            element={<ViewItem items={items} setItems={setItems} role={role} />}
          />
        </Route>
        <Route path="edit">
          <Route path=":id" element={<EditItem role={role} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
