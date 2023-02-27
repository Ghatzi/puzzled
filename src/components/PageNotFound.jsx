import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <>
    <h2 className="text-white">Page Not Found</h2>
    <p className="text-white py-1">
      click{' '}
      <Link to="/" className="text-red-400">
        here
      </Link>{' '}
      to navigate back to the home page
    </p>
  </>
);

export default PageNotFound;
