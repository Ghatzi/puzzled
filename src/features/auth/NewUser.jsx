import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { BASEURL } from '../../config/baseUrl';
import { ROLES } from '../../config/rolesObj';

const NewUser = ({ usersCount, findUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (findUser && findUser?.role.toString() !== 'admin') {
      navigate('/');
    }
  }, [findUser]);

  const options = Object.values(ROLES).map(roles => {
    return (
      <option key={roles} value={roles}>
        {roles}
      </option>
    );
  });

  const handleCreate = async () => {
    const url = `${BASEURL}/users`;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');

    const createUser = {
      id: usersCount,
      username,
      password,
      role,
      created_date: datetime,
      updated_date: datetime
    };

    const createOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createUser)
    };

    if (password !== confirmPassword) {
      setErrorMsg(true);
    } else {
      try {
        await fetch(url, createOptions)
          .then(response => response.json())
          .then(json => console.log(json));
        setErrorMsg(false);
        navigate('/users');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const canSave = username || password;

  return (
    <>
      <h2 className="text-white capitalize">Create a new user</h2>
      <form onSubmit={e => e.preventDefault()}>
        <Input
          labelText="Username:"
          inputType="text"
          inputId="username"
          inputValue={username}
          handleChange={e => setUsername(e.target.value)}
        />

        <Input
          labelText="Password:"
          inputType="text"
          inputId="password"
          inputValue={password}
          handleChange={e => setPassword(e.target.value)}
        />

        <Input
          labelText="Confirm Password:"
          inputType="text"
          inputId="confirmPassword"
          inputValue={confirmPassword}
          handleChange={e => setConfirmPassword(e.target.value)}
        />

        <p className="text-red-600">{errorMsg && 'passwords do not match'}</p>

        <label htmlFor="roles">Role:</label>
        <select id="roles" value={role} onChange={e => setRole(e.target.value)}>
          {options}
        </select>

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
      <Link className="mt-4 block italic text-white" to="../../users">
        back to users
      </Link>
    </>
  );
};

export default NewUser;
