import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';

const Layout = ({ getUserById }) => (
  <div className="flex flex-col min-h-screen">
    <Header getUserById={getUserById} />
    <main className="mx-52 my-5">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
