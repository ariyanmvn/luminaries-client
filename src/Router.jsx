import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainHome from "./pages/MainHome";
import Ticksts from "./pages/Ticksts";
import BuyNow from "./pages/BuyNow";
import Redirect from "./components/Redirect";
import JoinedStudents from "./pages/JoinedStudents";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateRoute from "../PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHome />,
    errorElement: <h1>Page not found</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tickets",
        element: <Ticksts />,
      },
      {
        path: "/buynow/:selectedPackage",
        element: <BuyNow />,
      },
      {
        path: "/redirect",
        element: <Redirect />,
      },
      {
        path: "/joined-students",
        element: <JoinedStudents />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
