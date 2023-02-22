import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="mx-56 my-5">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
