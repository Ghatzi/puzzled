import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { BASEURL } from '../../config/baseUrl';
import { NUMBEROFPIECES } from '../../config/piecesObj';

const EditItem = ({ items, users, username }) => {
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDimensions, setEditDimensions] = useState('');
  const [editPieces, setEditPieces] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [editAvailability, setEditAvailability] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const item = items.find(item => item.id.toString() === id);

  useEffect(() => {
    const checkUserRole = users.find(user => username === user.username);

    if (checkUserRole?.role !== 'admin') {
      navigate('/');
    }
  }, [username]);

  useEffect(() => {
    if (item) {
      setEditTitle(item.title);
      setEditDescription(item.description);
      setEditDimensions(item.dimensions);
      setEditPieces(item.pieces);
      setEditPrice(item.price);
      setEditAvailability(item.availability);
    }
  }, [
    item,
    setEditTitle,
    setEditDescription,
    setEditDimensions,
    setEditPieces,
    setEditPrice,
    setEditAvailability
  ]);

  const handleChange = () => {
    setEditAvailability(!editAvailability);
  };

  const handleEdit = async id => {
    const url = `${BASEURL}/items/${id}`;

    const updatedItem = {
      title: editTitle,
      description: editDescription,
      dimensions: editDimensions,
      pieces: Number(editPieces),
      price: Number(editPrice),
      availability: Boolean(editAvailability),
      updated_date: format(new Date(), 'MMMM dd, yyyy pp')
    };

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    };

    try {
      await fetch(url, updateOptions)
        .then(response => response.json())
        .then(json => console.log(json));
      navigate(`../../item/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const options = Object.values(NUMBEROFPIECES).map(pieces => {
    return (
      <option key={pieces} value={pieces}>
        {pieces}
      </option>
    );
  });

  const isNumberKey = e => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  };

  const textareaSelectStyle =
    'placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1';

  return (
    <>
      {item && (
        <form onSubmit={e => e.preventDefault()}>
          <Input
            labelText="Title:"
            inputType="text"
            inputId="title"
            inputValue={editTitle}
            handleChange={e => setEditTitle(e.target.value)}
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className={textareaSelectStyle}
            cols="30"
            rows="10"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
          />

          <Input
            labelText="Dimensions: (e.g. 48x48)"
            inputType="text"
            inputId="dimensions"
            inputValue={editDimensions}
            handleChange={e => setEditDimensions(e.target.value)}
          />

          <label htmlFor="pieces">Pieces:</label>
          <select
            className={textareaSelectStyle}
            id="pieces"
            value={editPieces}
            onChange={e => setEditPieces(e.target.value)}
          >
            {options}
          </select>

          <Input
            labelText="Price: "
            inputType="number"
            inputId="price"
            inputValue={editPrice}
            handleChange={e => setEditPrice(e.target.value)}
            inputKeyPress={e => isNumberKey(e)}
          />

          <div className="flex items-center">
            <Input
              labelText="Availability: "
              inputType="checkbox"
              inputId="availability"
              inputValue={editPrice}
              inputChecked={editAvailability}
              handleChange={handleChange}
            />
          </div>

          <div className="flex justify-end">
            <Button
              buttonText="Update"
              buttonIcon={<FaSave className="mr-1" />}
              buttonStyle="bg-blue-500 hover:bg-blue-700 focus:ring-blue-400"
              handleClick={() => handleEdit(item.id)}
            ></Button>
          </div>
        </form>
      )}
      <Link className="italic text-white" to={`../../item/${id}`}>
        back to item
      </Link>
    </>
  );
};

export default EditItem;
