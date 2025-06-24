import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: '/auth/login',
            element: <Login />
        },
        {
          path: '/auth/sign-up',
          element: <SignUp />
        }
    ]
  },
]);
export default routes;
