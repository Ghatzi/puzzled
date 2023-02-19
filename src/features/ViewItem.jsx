import { useParams } from 'react-router-dom';
import ViewItemAdminSection from './auth/ViewItemAdminSection';

const ViewItem = ({ items, setItems, role }) => {
  const { id } = useParams();

  const item = items.find(item => item.id.toString() === id);

  return (
    <>
      {item && (
        <>
          <article>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>No.of pieces: {item.pieces}</p>
            <p>Dimensions: {item.dimensions}</p>
            <p>{item.availabiliyy ? 'Available' : 'Out Of Stock'}</p>
            <p>£{item.price}</p>
          </article>

          {role === 'admin' && (
            <ViewItemAdminSection
              item={item}
              items={items}
              setItems={setItems}
            />
          )}
        </>
      )}
    </>
  );
};

export default ViewItem;
