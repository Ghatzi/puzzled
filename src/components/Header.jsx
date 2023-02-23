import { Link } from 'react-router-dom';

const Header = ({ username }) => {
  return (
    <header>
      <Link className="italic" to="/">
        Home
      </Link>
      <h5>Welcome back {username}</h5>
    </header>
  );
};

export default Header;
