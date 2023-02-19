import { Link } from 'react-router-dom';

const ItemList = ({ items }) => {
  const getAllItems = items.map(item => (
    <section key={item.id} className="items">
      <h3>
        <Link to={`../item/${item.id}`}>{item.title}</Link>
      </h3>
      <p>
        {item.description.length > 100
          ? `${item.description.slice(0, 100)}...`
          : item.description}
      </p>
      <p>{item.description.length}</p>
      <p>No.of pieces: {item.pieces}</p>
      <p>{item.availabiliyy ? 'Available' : 'Out Of Stock'}</p>
      <p>£{item.price}</p>
    </section>
  ));

  return <>{getAllItems}</>;
};

export default ItemList;
