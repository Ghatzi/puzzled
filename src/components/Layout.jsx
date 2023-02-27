import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../components';

const Layout = ({ findUser }) => (
  <div className="flex flex-col min-h-screen">
    <Header findUser={findUser} />
    <main className="mx-52 my-20">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
