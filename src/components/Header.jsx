import { Link } from 'react-router-dom';

const Header = ({ username }) => {
  return (
    <header>
      <h3>Welcome {username}</h3>
      <Link to="/">Home</Link>
    </header>
  );
};

export default Header;
