import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <h1>home</h1>
    <ul>
      <li>
        <Link className="italic text-white" to="../../items">
          view all items
        </Link>
      </li>
      <li>
        <Link className="italic text-white" to="../../users">
          view all users
        </Link>
      </li>
    </ul>
  </>
);

export default Home;
