import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { BASEURL } from '../../config/baseUrl';
import { NUMBEROFPIECES } from '../../config/piecesObj';

const NewItem = ({ findUser, itemsCount }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [pieces, setPieces] = useState(500);
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (findUser && findUser?.role.toString() !== 'admin') {
      navigate('/');
    }
  }, [findUser]);

  const handleChange = () => {
    setAvailability(!availability);
  };

  const handleCreate = async () => {
    const url = `${BASEURL}/items`;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');

    const createItem = {
      id: itemsCount,
      title,
      description,
      pieces: Number(pieces),
      dimensions,
      availability: Boolean(availability),
      price: Number(price),
      created_date: datetime,
      updated_date: datetime
    };

    const createOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createItem)
    };

    try {
      await fetch(url, createOptions)
        .then(response => response.json())
        .then(json => console.log(json));
      navigate('/items');
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

  const canSave = title || description || dimensions;

  return (
    <>
      <h2 className="text-white capitalize">Create a new item</h2>
      <form onSubmit={e => e.preventDefault()}>
        <Input
          labelText="Title:"
          inputType="text"
          inputId="title"
          inputValue={title}
          handleChange={e => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <Input
          labelText="Dimensions: (e.g. 48x48):"
          inputType="text"
          inputId="dimensions"
          inputValue={dimensions}
          handleChange={e => setDimensions(e.target.value)}
        />

        <label htmlFor="pieces">Pieces:</label>
        <select
          id="pieces"
          value={pieces}
          onChange={e => setPieces(e.target.value)}
        >
          {options}
        </select>

        <Input
          labelText="Price: "
          inputType="number"
          inputId="price"
          inputValue={price}
          handleChange={e => setPrice(e.target.value)}
          inputKeyPress={e => isNumberKey(e)}
        />

        <div className="flex items-center">
          <Input
            labelText="Availability:"
            inputType="checkbox"
            inputId="availability"
            inputValue={availability}
            inputChecked={availability}
            handleChange={handleChange}
          />
        </div>

        <div className="flex justify-end mt-5">
          <Button
            buttonText="Create"
            buttonIcon={<FaSave className="mr-1" />}
            buttonStyle="bg-blue-500 hover:bg-blue-700 focus:ring-blue-400"
            handleClick={handleCreate}
            buttonDisabled={!canSave}
          ></Button>
        </div>
      </form>
      <Link className="mt-4 block italic text-white" to="../../items">
        back to items
      </Link>
    </>
  );
};

export default NewItem;
