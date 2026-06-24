import { createHashRouter, RouterProvider } from "react-router-dom";

import Home from "./features/ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./features/ui/AppLayout";
import menuLoader from "./features/menu/menuLoader";
import Error from "./features/ui/Error";
import orderLoader from "./features/order/orderLoader";
import createOrderAction from "./features/order/actionCreateOrder";
import actionUpdateOrder from "./features/order/actionUpdateOrder";

const router = createHashRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, loader: menuLoader },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: actionUpdateOrder,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
