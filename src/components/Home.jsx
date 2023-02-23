import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>home</h1>
      <Link className="italic text-white" to="../../items">
        view full list
      </Link>
    </>
  );
};

export default Home;
