import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../../components';
import { BASEURL } from '../../config/baseUrl';
import { NUMBEROFPIECES } from '../../config/piecesObj';

const EditItem = ({ items, findUser }) => {
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
    if (findUser && findUser?.role.toString() !== 'admin') {
      navigate('/');
    }
  }, [findUser]);

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

    const updateItem = {
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
      body: JSON.stringify(updateItem)
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

  const canSave =
    editTitle !== item?.title ||
    editDescription !== item?.description ||
    editDimensions !== item?.dimensions ||
    Number(editPieces) !== Number(item?.pieces) ||
    Number(editPrice) !== Number(item?.price) ||
    Boolean(editAvailability) !== Boolean(item?.availability);

  return (
    <>
      {item && (
        <>
          <h2 className="text-white capitalize">Edit {item.title}</h2>
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
                labelText="Availability:"
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
                buttonDisabled={!canSave}
              ></Button>
            </div>
          </form>
        </>
      )}
      <Link className="italic text-white" to={`../../item/${id}`}>
        back to item
      </Link>
    </>
  );
};

export default EditItem;
