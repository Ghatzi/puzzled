import { Link } from 'react-router-dom';

const Footer = () => {
  const getYear = new Date().getFullYear();

  return (
    <footer>
      <Link className="italic" to="items">
        view all items
      </Link>
      <div className="text-right">&copy; {getYear} George Hatzi</div>
    </footer>
  );
};

export default Footer;
