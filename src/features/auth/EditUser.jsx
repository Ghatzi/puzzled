import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSave, FaTrash } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../../components';
import { BASEURL } from '../../config/baseUrl';
import { ROLES } from '../../config/rolesObj';

const EditUser = ({ users, setUsers, findUser }) => {
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const user = users.find(user => user.id.toString() === id);

  useEffect(() => {
    if (findUser && findUser?.role.toString() !== 'admin') {
      navigate('/');
    }
  }, [findUser]);

  useEffect(() => {
    if (user) {
      setEditUsername(user.username);
      setEditPassword(user.password);
      setEditRole(user.role);
    }
  }, [user, setEditUsername, setEditPassword, setEditRole]);

  const handleEdit = async id => {
    const url = `${BASEURL}/users/${id}`;

    const updateUser = {
      username: editUsername,
      password: editPassword,
      role: editRole,
      updated_date: format(new Date(), 'MMMM dd, yyyy pp')
    };

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUser)
    };

    try {
      await fetch(url, updateOptions)
        .then(response => response.json())
        .then(json => console.log(json));
      navigate('../../users');
    } catch (err) {
      console.log(err);
    }
  };

  const options = Object.values(ROLES).map(roles => {
    return (
      <option key={roles} value={roles}>
        {roles}
      </option>
    );
  });

  const canSave =
    editUsername !== user?.username ||
    editPassword !== user?.password ||
    editRole !== user?.role;

  const handleDelete = async id => {
    const url = `${BASEURL}/users/${id}`;

    try {
      await fetch(url, { method: 'DELETE' });
      const usersList = users.filter(user => user.id !== id);
      setUsers(usersList);
      navigate('/users');
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  return (
    <>
      {user && (
        <>
          <h2 className="text-white capitalize">Edit {user.username}</h2>
          <form onSubmit={e => e.preventDefault()}>
            <Input
              labelText="Username:"
              inputType="text"
              inputId="username"
              inputValue={editUsername}
              handleChange={e => setEditUsername(e.target.value)}
            />

            <Input
              labelText="Password:"
              inputType="password"
              inputId="password"
              inputValue={editPassword}
              handleChange={e => setEditPassword(e.target.value)}
            />

            <label htmlFor="roles">Role:</label>
            <select
              id="roles"
              value={editRole}
              onChange={e => setEditRole(e.target.value)}
            >
              {options}
            </select>

            <div className="mt-5 flex justify-end items-center">
              <Button
                buttonText="Update"
                buttonIcon={<FaSave className="mr-1" />}
                buttonStyle="bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 mr-3"
                handleClick={() => handleEdit(user.id)}
                buttonDisabled={!canSave}
              ></Button>

              <Button
                buttonText="Delete"
                buttonIcon={<FaTrash className="mr-1" />}
                buttonStyle="bg-red-500 hover:bg-red-700 focus:ring-red-400"
                handleClick={() => handleDelete(user.id)}
              ></Button>
            </div>
          </form>
        </>
      )}
      <Link className="mt-4 block italic text-white" to="../../users">
        back to users
      </Link>
    </>
  );
};

export default EditUser;
