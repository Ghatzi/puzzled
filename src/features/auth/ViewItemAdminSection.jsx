import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BASEURL } from '../../config/baseUrl';

const ViewItemAdminSection = ({ item, items, setItems }) => {
  const navigation = useNavigate();

  const url = `${BASEURL}/items`;

  const handleDelete = async id => {
    try {
      await fetch(`${url}/${id}`, { method: 'DELETE' });
      const itemsList = items.filter(item => item.id !== id);
      setItems(itemsList);
      navigation('/items');
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  return (
    <>
      <section>
        <p>{item.created_date}</p>
        <p>{item.updated_date}</p>
      </section>

      <Link to={`../../edit/${item.id}`}>
        <button className="editButton">
          <FaEdit /> Edit this item
        </button>
      </Link>

      <button className="deleteButton" onClick={() => handleDelete(item.id)}>
        <FaTrash /> Delete this item
      </button>
    </>
  );
};

export default ViewItemAdminSection;
