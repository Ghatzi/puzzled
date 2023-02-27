import { Link } from 'react-router-dom';

const Header = ({ findUser }) => {
  return (
    <header>
      <Link to="/">Home</Link>
      <h5>Welcome back {findUser}</h5>
    </header>
  );
};

export default Header;
