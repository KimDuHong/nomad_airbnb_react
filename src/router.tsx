import { createBrowserRouter } from "react-router-dom";
import RoomDetail from "./components/routers/RoomDetail";
import Root from "./components/Root";
import Home from "./components/routers/Home";
import NotFound from "./components/routers/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
    ],
  },
]);

export default router;
