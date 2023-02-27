import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../../components';

const ViewItemAdminSection = ({ item, handleDelete }) => (
  <section className="mt-4">
    <p>Created: {item.created_date}</p>
    <p>Updated: {item.updated_date}</p>

    <div className="mt-5 flex justify-end items-center">
      <Link to={`../edit/${item.id}`}>
        <Button
          buttonText="Edit"
          buttonIcon={<FaEdit className="mr-1" />}
          buttonStyle="bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 mr-3"
        ></Button>
      </Link>

      <Button
        buttonText="Delete"
        buttonIcon={<FaTrash className="mr-1" />}
        buttonStyle="bg-red-500 hover:bg-red-700 focus:ring-red-400"
        handleClick={() => handleDelete(item.id)}
      ></Button>
    </div>
  </section>
);

export default ViewItemAdminSection;
