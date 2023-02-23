import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ username }) => (
  <div className="flex flex-col min-h-screen">
    <Header username={username} />
    <main className="mx-52 my-5">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
