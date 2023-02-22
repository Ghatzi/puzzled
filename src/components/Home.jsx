import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to Puzzled</h1>
      <Link to="items">view all items</Link>
    </>
  );
};

export default Home;
