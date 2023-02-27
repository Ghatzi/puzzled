import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASEURL } from '../config/baseUrl';
import ViewItemAdminSection from './auth/ViewItemAdminSection';

const ViewItem = ({ items, setItems, findUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = items.find(item => item.id.toString() === id);

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

  const handleDelete = async id => {
    const url = `${BASEURL}/items/${id}`;

    try {
      await fetch(url, { method: 'DELETE' });
      const itemsList = items.filter(item => item.id !== id);
      setItems(itemsList);
      navigate('/items');
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  return (
    <>
      {item && (
        <>
          <h2 className="capitalize text-white">{item.title}</h2>
          <article className="items">
            <p>{item.description}</p>

            <div className="mt-4">
              <p>Dimensions: {item.dimensions}</p>
              <p>No.of pieces: {item.pieces}</p>
              <p>Retail price: £{item.price}</p>
              <p>
                Availability:
                <span
                  className={
                    item.availability ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {item.availability ? ' Available' : ' Out Of Stock'}
                </span>
              </p>
            </div>

            {findUser && findUser.role === 'admin' && (
              <ViewItemAdminSection item={item} handleDelete={handleDelete} />
            )}
          </article>
        </>
      )}
      <Link className="mt-4 block italic text-white" to="../../items">
        back to items
      </Link>
    </>
  );
};

export default ViewItem;
