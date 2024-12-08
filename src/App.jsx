import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes, useLocation } from 'react-router-dom';
import Product from './Pages/Product';
import Order from './Pages/Order';
import Profile from './Pages/Profile';
import SideBar from './Components/SideBar';

const routes = [
  { path: "/order", element: <Order /> },
  { path: "/product", element: <Product /> },
  { path: "/profile", element: <Profile /> },
];

function App() {
  const route = useRoutes(routes);
  const location = useLocation();

  return (
    <div className="d-flex">
      <SideBar activePath={location.pathname} />
      <div className="content flex-grow-1">
        {route}
      </div>
    </div>
  );
}

export default App;
