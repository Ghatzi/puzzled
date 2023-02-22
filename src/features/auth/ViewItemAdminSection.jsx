import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BASEURL } from '../../config/baseUrl';

const ViewItemAdminSection = ({ item, items, setItems }) => {
  const navigate = useNavigate();

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
    <section className="mt-4">
      <p>Created date: {item.created_date}</p>
      <p>Updated date: {item.updated_date}</p>

      <div className="mt-5 flex justify-end items-center">
        <Link to={`../../edit/${item.id}`}>
          <button className="flex items-center py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-2">
            <FaEdit className="mr-1" />
            Edit item
          </button>
        </Link>

        <button
          className="flex items-center py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          onClick={() => handleDelete(item.id)}
        >
          <FaTrash className="mr-1" />
          Delete item
        </button>
      </div>
    </section>
  );
};

export default ViewItemAdminSection;
