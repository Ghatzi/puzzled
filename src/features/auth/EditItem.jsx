import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASEURL } from '../../config/baseUrl';

const EditItem = ({ items, users, username }) => {
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const item = items.find(item => item.id.toString() === id);

  const checkUserRole = users.find(user => username === user.username);

  useEffect(() => {
    if (checkUserRole) {
      if (checkUserRole.role !== 'admin') {
        navigate('/');
      }
    }
  }, [username]);

  useEffect(() => {
    if (item) {
      setEditTitle(item.title);
      setEditDescription(item.description);
    }
  }, [item, setEditTitle, setEditDescription]);

  const handleEdit = async id => {
    const url = `${BASEURL}/items/${id}`;

    const updatedItem = {
      title: editTitle,
      description: editDescription
    };

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    };

    try {
      await fetch(url, updateOptions);
      navigate(`../../item/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // textfield for title
  // textarea for description
  // textfield for dimensions
  // options for no.of pieces
  // checkbox for availability (true or false)
  // textbox for price (numbers and . only)
  // updated_date

  return (
    <>
      {item && (
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md mt-5 py-2 px-8 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            id="title"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />

          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md mt-5 py-2 px-8 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
            cols="30"
            rows="10"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
          />

          <button type="button" onClick={() => handleEdit(item.id)}>
            Update
          </button>
        </form>
      )}
    </>
  );
};

export default EditItem;
