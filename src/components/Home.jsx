import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>Welcome to Puzzled</h1>
      <Link to="items">view all items</Link>
    </>
  );
};

export default Home;
