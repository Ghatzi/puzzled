import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BASEURL } from '../../config/baseUrl';
import Button from '../../components/Button';

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
      <p>Created: {item.created_date}</p>
      <p>Updated: {item.updated_date}</p>

      <div className="mt-5 flex justify-end items-center">
        <Link to={`../../edit/${item.id}`}>
          <Button
            buttonText="Edit"
            buttonIcon={<FaEdit className="mr-1" />}
            buttonColor="bg-blue-500 hover:bg-blue-700 focus:ring-blue-400"
          ></Button>
        </Link>

        <Button
          buttonText="Delete"
          buttonIcon={<FaTrash className="mr-1" />}
          buttonColor="bg-red-500 hover:bg-red-700 focus:ring-red-400"
          handleClick={() => handleDelete(item.id)}
        ></Button>
      </div>
    </section>
  );
};

export default ViewItemAdminSection;
