import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

const ItemList = ({ items, itemsLoading }) => {
  const [search, setSearch] = useState('');

  const filteredItems = items
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.title.localeCompare(b.title));

  const getAllItems = filteredItems.map(item => (
    <section key={item.id} className="my-5 px-8 py-4 rounded-md bg-neutral-200">
      <h3 className="capitalize">
        <Link to={`../item/${item.id}`}>{item.title}</Link>
      </h3>
      <p>
        {item.description.length > 150
          ? `${item.description.slice(0, 150)}...`
          : item.description}
      </p>
      <p className="mt-4">No.of pieces: {item.pieces}</p>
      <p>
        Availability:
        <span className={item.availability ? 'text-green-500' : 'text-red-600'}>
          {item.availability ? ' Available' : ' Out Of Stock'}
        </span>
      </p>
      <p>
        Retail price: <span className="font-bold">£{item.price}</span>
      </p>
      <Link to={`../item/${item.id}`}>
        <p className="mt-4">view more details</p>
      </Link>
    </section>
  ));

  return (
    <>
      {itemsLoading ? (
        <p>Loading items...</p>
      ) : (
        <>
          <h2>Items</h2>
          <Search search={search} setSearch={setSearch} />
          {getAllItems}
        </>
      )}
    </>
  );
};

export default ItemList;
