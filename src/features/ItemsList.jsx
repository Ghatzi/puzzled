import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button, Search } from '../components';

const ItemList = ({ items, itemsLoading }) => {
  const [search, setSearch] = useState('');

  const filteredItems = items
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.title.localeCompare(b.title));

  const getAllItems = filteredItems.map(item => (
    <article key={item.id} className="items">
      <h3 className="capitalize">
        <Link to={`../item/${item.id}`}>{item.title}</Link>
      </h3>
      <p>
        {item.description.length > 150
          ? `${item.description.slice(0, 150)}...`
          : item.description}
      </p>
      <p className="mt-4">No.of pieces: {item.pieces}</p>
      <p>Retail price: £{item.price}</p>
      <p>
        Availability:
        <span className={item.availability ? 'text-green-600' : 'text-red-600'}>
          {item.availability ? ' Available' : ' Out Of Stock'}
        </span>
      </p>
      <Link to={`../item/${item.id}`}>
        <p className="mt-4 italic text-right">view more details</p>
      </Link>
    </article>
  ));

  return (
    <>
      {itemsLoading ? (
        <p className="text-white">Loading items...</p>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="text-white">Items</h2>
            <Button
              buttonText="Add"
              buttonIcon={<FaPlus className="mr-1" />}
              buttonStyle="bg-blue-500 hover:bg-blue-700 focus:ring-blue-400"
            ></Button>
          </div>
          <Search search={search} setSearch={setSearch} />
          {getAllItems.length === 0 ? (
            <p className="text-white mt-3">
              no items found, try another search
            </p>
          ) : (
            getAllItems
          )}
        </>
      )}
    </>
  );
};

export default ItemList;
