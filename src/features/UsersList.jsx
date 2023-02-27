import { useEffect } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import { BASEURL } from '../config/baseUrl';

const UsersList = ({ users, setUsers, usersLoading, getUserById }) => {
  useEffect(() => {
    const fetchUsers = async () => {
      const url = `${BASEURL}/users`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const getAllUsers =
    users &&
    users.map(user => (
      <li className="flex items-center" key={user.id}>
        {user.username}
        {getUserById && getUserById.role === 'admin' && (
          <Link to={`../user/edit/${user.id}`}>
            <FaEdit className="ml-3" />
          </Link>
        )}
      </li>
    ));

  return (
    <>
      {usersLoading ? (
        <p className="text-white">Loading users...</p>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="text-white">Users</h2>
            <Button
              buttonText="Add"
              buttonIcon={<FaPlus className="mr-1" />}
              buttonStyle="bg-blue-500 hover:bg-blue-700 focus:ring-blue-400"
            ></Button>
          </div>
          <ul className="users">{getAllUsers}</ul>
        </>
      )}
    </>
  );
};

export default UsersList;
