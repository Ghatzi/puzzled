import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <h1>Home</h1>
    <ul className="mt-5">
      <li>
        <Link className="text-white" to="../../items">
          view all items
        </Link>
      </li>
      <li>
        <Link className="text-white" to="../../users">
          view all users
        </Link>
      </li>
    </ul>
  </>
);

export default Home;
