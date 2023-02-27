import { Link } from 'react-router-dom';

const Header = ({ getUserById }) => {
  return (
    <header>
      <Link className="italic" to="/">
        Home
      </Link>
      <h5>Welcome back {getUserById}</h5>
    </header>
  );
};

export default Header;
