import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASEURL } from '../config/baseUrl';
import ViewItemAdminSection from './auth/ViewItemAdminSection';

const ViewItem = ({ items, setItems, users, username }) => {
  const { id } = useParams();

  const item = items.find(item => item.id.toString() === id);

  const checkUserRole = users.find(user => username === user.username);

  useEffect(() => {
    const fetchItems = async () => {
      const url = `${BASEURL}/items`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItems();
  }, [setItems]);

  return (
    <>
      {item && (
        <article className="px-8 py-4 rounded-md bg-neutral-200">
          <h3 className="capitalize">{item.title}</h3>
          <p>{item.description}</p>

          <div className="mt-4">
            <p>Dimensions: {item.dimensions}</p>
            <p>No.of pieces: {item.pieces}</p>
            <p>
              Availability:
              <span
                className={
                  item.availability ? 'text-green-500' : 'text-red-600'
                }
              >
                {item.availability ? ' Available' : ' Out Of Stock'}
              </span>
            </p>
            <p>
              Retail price: <span className="font-bold">£{item.price}</span>
            </p>
          </div>

          {checkUserRole && checkUserRole.role === 'admin' && (
            <ViewItemAdminSection
              item={item}
              items={items}
              setItems={setItems}
            />
          )}
        </article>
      )}
      <Link to="../../items">back to full list</Link>
    </>
  );
};

export default ViewItem;
